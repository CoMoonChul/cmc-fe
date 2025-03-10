import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const response = await fetch(`${BACKEND_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      return NextResponse.json(await response.json(), {
        status: response.status,
      })
    }

    const { accessToken, refreshToken } = await response.json()

    // 쿠키 설정
    const res = NextResponse.json({ message: 'Login successful' })

    ///// 여기부터는 벌써 http only 쿠키에 rt가 있어야되네
    console.log('#######', req.cookies)
    console.log('@@@@@@@@', res.cookies)

    // res.cookies.set('accessToken', accessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'strict',
    //   path: '/',
    // })

    return res
  } catch (error) {
    console.error('[auth/login] error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
