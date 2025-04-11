import { NextRequest, NextResponse } from 'next/server'
import { API_ENDPOINTS } from '@/features/user/types'

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  }
  try {
    const body = await req.json()
    const response = await fetch(API_ENDPOINTS.WITHDRAW, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      credentials: 'include',
    })

    if (!response.ok) {
      return NextResponse.json(await response.json(), {
        status: response.status,
      })
    }

    const res = NextResponse.json({
      message: 'Withdraw successful',
      status: response.status,
    })
    res.cookies.set('accessToken', '', { maxAge: 0, path: '/' })
    res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' })
    return res
  } catch (error) {
    console.error('[auth/withdraw] error:', error)
    const res = NextResponse.json({ message: 'Withdraw api error' })
    res.cookies.set('accessToken', '', { maxAge: 0, path: '/' })
    res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' })
    return res
  }
}
