export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export const API_PATH = {
  LOGIN: '/user/login',
  JOIN: '/user/join',
  LOGOUT: '/user/logout',
  REFRESH: '/user/refresh',
  FINDACCOUNT: '/user/findAccount',
  WITHDRAW: '/user/withdraw',
}

export const API_ENDPOINTS = {
  LOGIN: `${BACKEND_URL + API_PATH.LOGIN}`,
  JOIN: `${BACKEND_URL + API_PATH.JOIN}`,
  LOGOUT: `${BACKEND_URL + API_PATH.LOGOUT}`,
  REFRESH: `${BACKEND_URL + API_PATH.REFRESH}`,
  FINDACCOUNT: `${BACKEND_URL + API_PATH.FINDACCOUNT}`,
  WITHDRAW: `${BACKEND_URL + API_PATH.WITHDRAW}`,
}

export const QUERY_KEYS = {
  USER: {
    DETAIL: 'user.detail',
  } as const,
}
