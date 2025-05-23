import { NextRequest, NextResponse } from 'next/server'
import { API_ENDPOINTS } from '@/features/user/types'

// 로그아웃 api의 경우 액세스 토큰이 필요함. 하지만 api route.ts에 포함되지 못해 at 갱신 로직 등이 적용되지 못해, 간혹 에러가 발생할 수 있음
export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  }
  try {
    const response = await fetch(API_ENDPOINTS.LOGOUT, {
      method: 'POST',
      headers,
      credentials: 'include',
    })

    if (!response.ok) {
      console.error('[auth/logout] response not ok')
      return getLogoutResponse()
    }

    return getLogoutResponse()
  } catch (error) {
    console.error('[auth/logout] catch error:', error)
    return getLogoutResponse()
  }
}

const getLogoutResponse = () => {
  const res = NextResponse.json({ message: 'Logout successful' })
  res.cookies.set('accessToken', '', {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' })
  return res
}
