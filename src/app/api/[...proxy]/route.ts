import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'
const REFRESH_TOKEN_URL = `${BACKEND_URL}/user/tempRefresh`

/**
 * API 호출 핸들러
 * @param req NextRequest
 * @param retried 재시도 여부
 * @returns NextResponse
 */
async function handleRequest(
  req: NextRequest,
  retried = false,
): Promise<NextResponse> {
  try {
    const path = req.nextUrl.pathname.replace(/^\/api/, '')
    const searchParams = req.nextUrl.search
    const url = `${BACKEND_URL}${path}${searchParams ? searchParams : ''}`
    const body =
      req.method !== 'GET' ? JSON.stringify(await req.json()) : undefined

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

    // accessToken이 만료된 경우, refreshToken을 사용하여 새로운 accessToken을 받아온다.
    if (response.status === 401 && !retried && refreshToken) {
      // 새로운 accessToken 요청
      const newAccessToken = await refreshAccessToken(refreshToken)

      if (!newAccessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      // 새로운 accessToken을 헤더에 추가하여 다시 요청
      headers.Authorization = `Bearer ${newAccessToken}`
      response = await fetch(url, {
        method: req.method,
        headers,
        body,
        credentials: 'include',
      })

      // 새로운 accessToken을 쿠키로 설정하여 응답 반환
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
    return accessToken
  } catch (error) {
    console.error('[refreshAccessToken] Error:', error)
    return null
  }
}

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
