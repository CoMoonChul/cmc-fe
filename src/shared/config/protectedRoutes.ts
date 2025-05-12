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
  /^\/review\/form\/[a-zA-Z0-9-_]+$/, // /review/form/:id
  /^\/livecoding\/[a-zA-Z0-9-]+$/, // /livecoding/:id
  /^\/livecoding\/join\/[a-zA-Z0-9-_]+$/, // /livecoding/join/:id
]
