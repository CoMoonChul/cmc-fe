export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export const API_PATH = {
  LOGIN: '/user/login',
  LOGIN_GOOGLE: '/user/login/google',
  JOIN: '/user/join',
  LOGOUT: '/user/logout',
  REFRESH: '/user/refresh',
  FINDACCOUNT: '/user/findAccount',
  WITHDRAW: '/user/withdraw',
}

export const API_ENDPOINTS = {
  LOGIN: `${BACKEND_URL + API_PATH.LOGIN}`,
  LOGIN_GOOGLE: `${BACKEND_URL + API_PATH.LOGIN_GOOGLE}`,
  JOIN: `${BACKEND_URL + API_PATH.JOIN}`,
  LOGOUT: `${BACKEND_URL + API_PATH.LOGOUT}`,
  REFRESH: `${BACKEND_URL + API_PATH.REFRESH}`,
  FINDACCOUNT: `${BACKEND_URL + API_PATH.FINDACCOUNT}`,
  WITHDRAW: `${BACKEND_URL + API_PATH.WITHDRAW}`,
}

export const userKeys = {
  all: ['user'] as const,
  list: (...conditions: number[]) =>
    [...userKeys.all, 'list', ...conditions] as const,
  detail: () => [...userKeys.all, 'detail'] as const,
}
