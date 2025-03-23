// 정적 라우팅 경로
export const PROTECTED_ROUTES = ['/battle/form', '/notice']

// 동적 라우팅 경로
export const DYNAMIC_PROTECTED_ROUTES = [
  /^\/battle\/form\/[a-zA-Z0-9-_]+$/, // /battle/form/:id (예: /battle/123, /battle/abc-def)
]
