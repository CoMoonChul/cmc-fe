import { NextRequest, NextResponse } from 'next/server'
import { API_ENDPOINTS } from '@/features/user/types'
import { getErrorMessage } from '@/shared/lib/messages'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    })

    // 로그인 api 에러 반환
    if (!response.ok) {
      const errResponse = await response.json()
      return NextResponse.json({
        message: getErrorMessage(errResponse.message),
        status: response.status,
      })
    }

    // refresh token set cookie header
    const setCookieHeader = response.headers.get('set-cookie')
    const { accessToken, userNum } = await response.json()
    const res = NextResponse.json({ userNum: userNum, status: response.status })
    if (setCookieHeader) {
      res.headers.set('Set-Cookie', setCookieHeader)
    }
    // access token set cookie header
    res.headers.append(
      'Set-Cookie',
      `accessToken=${accessToken}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=None; Max-Age=600`,
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
