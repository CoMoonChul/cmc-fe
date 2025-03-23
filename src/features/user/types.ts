export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export const API_PATH = {
  LOGIN: '/user/login',
  JOIN: '/user/join',
  LOGOUT: '/user/logout',
  REFRESH: '/user/refresh',
}

export const API_ENDPOINTS = {
  LOGIN: `${BACKEND_URL + API_PATH.LOGIN}`,
  JOIN: `${BACKEND_URL + API_PATH.JOIN}`,
  LOGOUT: `${BACKEND_URL + API_PATH.LOGOUT}`,
  REFRESH: `${BACKEND_URL + API_PATH.REFRESH}`,
}
