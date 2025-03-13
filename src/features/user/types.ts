export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export const API_ENDPOINTS = {
  LOGIN: `${BACKEND_URL}/user/login`,
  LOGOUT: `${BACKEND_URL}/user/logout`,
  REFRESH: `${BACKEND_URL}/user/refresh`,
}
