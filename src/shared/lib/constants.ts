// export const CLIENT_BASE_PATH = '/api'
// export const SERVER_BASE_PATH =  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'
export const CLIENT_BASE_PATH = process.env.NEXT_PUBLIC_CLIENT_BASE_PATH
export const SERVER_BASE_PATH = process.env.NEXT_PUBLIC_SERVER_BASE_PATH

console.log('[constants] CLIENT_BASE_PATH =', CLIENT_BASE_PATH)
console.log('[constants] SERVER_BASE_PATH =', SERVER_BASE_PATH)

export const LOGO_PATH =
  'https://cmc-public-bucket.s3.ap-northeast-2.amazonaws.com/logos/cmc_icon.png'
