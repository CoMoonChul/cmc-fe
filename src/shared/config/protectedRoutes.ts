// 정적 라우팅 경로
export const PROTECTED_ROUTES = ['/battle/form']

// 동적 라우팅 경로
export const DYNAMIC_PROTECTED_ROUTES = [
  /^\/battle\/\d+$/, // /battle/:id
  /^\/battle\/form\/\d+$/, // /battle/form/:id
]
