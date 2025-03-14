import { NextRequest, NextResponse } from 'next/server'
import { API_ENDPOINTS } from '@/features/user/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const response = await fetch(API_ENDPOINTS.LOGOUT, {
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

    const res = NextResponse.json({ message: 'Logout successful' })
    // 쿠키 삭제
    res.cookies.set('accessToken', '', { maxAge: 0, path: '/' })
    res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' })
    return res
  } catch (error) {
    console.error('[auth/logout] error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
