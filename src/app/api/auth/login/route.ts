import { NextRequest, NextResponse } from 'next/server'
import { API_ENDPOINTS } from '@/features/user/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    })

    if (!response.ok) {
      return NextResponse.json(await response.json(), {
        status: response.status,
      })
    }

    const setCookieHeader = response.headers.get('set-cookie')
    const { accessToken } = await response.json()

    const res = NextResponse.json({ message: 'Login successful' })
    if (setCookieHeader) {
      res.headers.set('Set-Cookie', setCookieHeader)
    }

    res.headers.append(
      'Set-Cookie',
      `accessToken=${accessToken}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Strict; Max-Age=900`,
    )
    return res
  } catch (error) {
    console.error('[auth/login] error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
