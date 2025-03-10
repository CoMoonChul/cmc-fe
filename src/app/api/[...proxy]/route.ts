import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'
const REFRESH_TOKEN_URL = `${BACKEND_URL}/user/refresh`

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
    console.log('@@@@@@@headers', headers)

    let response = await fetch(url, {
      method: req.method,
      headers,
      body,
    })

    console.log('@@@@@@response', response)

    // accessToken이 만료된 경우, refreshToken을 사용하여 새로운 accessToken을 받아온다.
    if (response.status === 401 && !retried && refreshToken) {
      console.log('🔄 AccessToken expired. Trying to refresh...')

      // 새로운 accessToken 요청
      const newAccessToken = await refreshAccessToken(refreshToken)

      if (!newAccessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      console.log('✅ AccessToken refreshed successfully!')

      // 새로운 accessToken을 헤더에 추가하여 다시 요청
      headers.Authorization = `Bearer ${newAccessToken}`
      response = await fetch(url, {
        method: req.method,
        headers,
        body,
      })

      // 새로운 accessToken을 쿠키로 설정하여 응답 반환
      return setAccessTokenCookie(response, newAccessToken)
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
  try {
    const response = await fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
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

/**
 * 새로운 accessToken을 쿠키로 설정하여 응답 반환
 * @param originalResponse Response
 * @param newAccessToken string
 * @returns NextResponse
 */
function setAccessTokenCookie(
  originalResponse: Response,
  newAccessToken: string,
): NextResponse {
  const response = NextResponse.json(originalResponse.body, {
    status: originalResponse.status,
  })

  response.cookies.set('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  return response
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
