import { NextRequest, NextResponse } from 'next/server'

// 로그인 필수 페이지 목록
const protectedRoutes = ['/battle']

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
  if (url.pathname === '/user/login') {
    return NextResponse.next()
  }

  // 보호된 페이지에 접근했지만 로그인 안 된 경우 로그인 페이지로 이동
  if (protectedRoutes.includes(url.pathname) && !token) {
    url.pathname = '/user/login'
    url.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
