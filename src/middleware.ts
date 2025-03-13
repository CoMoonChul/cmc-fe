import { NextRequest, NextResponse } from 'next/server'
import {
  PROTECTED_ROUTES,
  DYNAMIC_PROTECTED_ROUTES,
} from '@/shared/config/protectedRoutes'
import { API_PATH } from '@/features/user/types'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value
  const url = req.nextUrl.clone()

  // 정적 파일 제외
  if (
    url.pathname.startsWith('/_next/static') ||
    url.pathname.startsWith('/public')
  ) {
    return NextResponse.next()
  }

  // API 요청 제외
  if (url.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // 로그인 페이지 제외(무한 리다이렉트 방지)
  if (url.pathname === API_PATH.LOGIN) {
    return NextResponse.next()
  }

  const isProtectedRoute = PROTECTED_ROUTES.includes(url.pathname)
  const isDynamicProtectedRoute = DYNAMIC_PROTECTED_ROUTES.some((regex) =>
    regex.test(url.pathname),
  )

  // 로그인 필수 경로에 접근했지만 로그인 안 된 경우
  if ((isProtectedRoute || isDynamicProtectedRoute) && !token) {
    url.pathname = API_PATH.LOGIN
    url.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
