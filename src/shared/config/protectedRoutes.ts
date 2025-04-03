// 정적 라우팅 경로
export const PROTECTED_ROUTES = [
  '/battle/form',
  '/review/form',
  '/livecoding',
  '/livecoding/join',
  '/notice',
  '/user/profile',
]

// 동적 라우팅 경로
export const DYNAMIC_PROTECTED_ROUTES = [
  /^\/battle\/form\/[a-zA-Z0-9-_]+$/, // /battle/form/:id (예: /battle/123, /battle/abc-def)
  /^\/review\/form\/[a-zA-Z0-9-_]+$/, // /review/form/:id (예: /review/123, /review/abc-def)
  /^\/livecoding\/[a-zA-Z0-9-]+$/,
]
