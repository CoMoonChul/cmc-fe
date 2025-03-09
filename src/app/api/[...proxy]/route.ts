import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'
const REFRESH_TOKEN_URL = `${BACKEND_URL}/user/refresh`

let isRefreshing = false
let refreshPromise: Promise<string | null> | null = null
const requestQueue: ((token: string | null) => void)[] = []

/**
 * api 호출 핸들러
 * @param req NextRequest
 * @param retried 재시도 여부
 * @returns NextResponse
 */
async function handleRequest(req: NextRequest, retried = false) {
  try {
    const path = req.nextUrl.pathname.replace(/^\/api/, '')
    const searchParams = req.nextUrl.search
    const url = `${BACKEND_URL}${path}${searchParams ? searchParams : ''}`
    const body =
      req.method !== 'GET' ? JSON.stringify(await req.json()) : undefined

    const accessToken = req.cookies.get('accessToken')?.value
    const refreshToken = req.cookies.get('refreshToken')?.value

    console.log('handleRequest accessToken', accessToken)
    console.log('rhandleRequest efreshToken', refreshToken)

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    }

    const response = await fetch(url, {
      method: req.method,
      headers,
      body,
    })

    if (response.status === 401 && !retried && refreshToken) {
      const newAccessToken = await getRefreshedAccessToken(refreshToken)
      if (!newAccessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return handleRequest(req, true)
    }

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    // hard error like backend not working
    console.error('[api][route.ts] error', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

/**
 * accessToken 갱신 진행 상태 기반 requestQueue 처리
 * @param refreshToken refreshToken
 */
async function getRefreshedAccessToken(refreshToken: string) {
  if (isRefreshing) {
    return new Promise((resolve) => {
      requestQueue.push(() => {
        resolve(refreshPromise)
      })
    })
  }

  isRefreshing = true
  refreshPromise = refreshAccessToken(refreshToken)

  try {
    const newAccessToken = await refreshPromise
    requestQueue.forEach((resolve) => resolve(newAccessToken))
    requestQueue.length = 0
    return newAccessToken
  } finally {
    isRefreshing = false
    refreshPromise = null
  }
}

/**
 * accessToken 갱신
 * @param refreshToken refreshToken
 * @returns accessToken or null
 */
async function refreshAccessToken(refreshToken: string) {
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

    const responseHeaders = new Headers()
    responseHeaders.append(
      'Set-Cookie',
      `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    )
    return accessToken
  } catch (error) {
    console.error('❌ Refresh API Error:', error)
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
