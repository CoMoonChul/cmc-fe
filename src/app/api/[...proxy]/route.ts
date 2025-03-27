import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'
const REFRESH_TOKEN_URL = `${BACKEND_URL}/user/tempRefresh`

export async function GET(req: NextRequest) {
  return handleRequest(req)
}
export async function POST(req: NextRequest) {
  return handleRequest(req)
}
export async function PUT(req: NextRequest) {
  return handleRequest(req)
}
export async function DELETE(req: NextRequest) {
  return handleRequest(req)
}

async function handleRequest(
  req: NextRequest,
  retried = false,
): Promise<NextResponse> {
  try {
    const path = req.nextUrl.pathname.replace(/^\/api/, '')
    const searchParams = req.nextUrl.search
    const url = `${BACKEND_URL}${path}${searchParams}`
    const body = await parseRequestBody(req)

    const accessToken = req.cookies.get('accessToken')?.value
    const refreshToken = req.cookies.get('refreshToken')?.value

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    }

    let response = await fetch(url, {
      method: req.method,
      headers,
      body,
      credentials: 'include',
    })

    if (response.status === 401 && !retried && refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken)
      if (!newAccessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      headers.Authorization = `Bearer ${newAccessToken}`
      response = await fetch(url, {
        method: req.method,
        headers,
        body,
        credentials: 'include',
      })

      const newResponse = NextResponse.json(await response.json(), {
        status: response.status,
      })
      newResponse.headers.append(
        'Set-Cookie',
        `accessToken=${newAccessToken}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Strict; Max-Age=900`,
      )
      return newResponse
    }

    return NextResponse.json(await response.json(), { status: response.status })
  } catch (error) {
    console.error('[api][route.ts] error', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

function getCookie(req: NextRequest, name: string): string | undefined {
  const raw = req.headers.get('cookie')
  if (!raw) return undefined
  const cookies = raw.split(';').map((c) => c.trim())
  return cookies.find((c) => c.startsWith(`${name}=`))?.split('=')[1]
}

async function parseRequestBody(req: NextRequest): Promise<string | undefined> {
  if (req.method === 'GET') return undefined
  try {
    return JSON.stringify(await req.json())
  } catch {
    return undefined
  }
}

/**
 * accessToken 갱신
 * @param refreshToken string
 * @returns accessToken | null
 */
async function refreshAccessToken(
  refreshToken: string,
): Promise<string | null> {
  const body = {
    refreshToken,
  }

  try {
    const response = await fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    })
    if (!response.ok) {
      return null
    }

    const { accessToken } = await response.json()
    console.log('[route.ts][refreshAccessToken] success')
    return accessToken
  } catch (error) {
    console.error('[apiClient][refreshAccessToken] Failed:', error)
    return null
  }
}
