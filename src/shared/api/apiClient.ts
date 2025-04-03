/* tslint:disable */
/* eslint-disable */
import { getErrorMessage } from '@/shared/lib/messages'
import { usePopupStore } from '../store/usePopupStore'
// import { refreshAccessToken } from '@/shared/lib/token'
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'
const REFRESH_TOKEN_URL = `${BACKEND_URL}/user/tempRefresh`

/**
 * 공통 API 요청 함수 (axios 기반)
 * @param requestFn OpenAPI에서 생성된 API 함수
 * @param manualErrorHandle 에러 수동 처리 여부 (기본값: false)
 * @param args API 함수에 전달할 인자들
 * @returns 응답 데이터
 */
async function apiClient<T>(
  requestFn: (...args: any[]) => Promise<T>,
  manualErrorHandle = false,
  ...args: any[]
): Promise<T> {
  const isClient = typeof window !== 'undefined'
  try {
    if (!isClient) {
      const { cookies } = await import('next/headers')

      const accessToken = (await cookies()).get('accessToken')?.value
      const refreshToken = (await cookies()).get('refreshToken')?.value

      const lastArg = args[args.length - 1]
      const config =
        typeof lastArg === 'object' && lastArg?.headers ? { ...lastArg } : {}

      config.headers = {
        ...(config.headers || {}),
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...(refreshToken && { Cookie: `refreshToken=${refreshToken}` }),
      }

      if (typeof lastArg === 'object' && lastArg?.headers) {
        args[args.length - 1] = config
      } else {
        args.push(config)
      }

      try {
        return await requestFn(...args)
      } catch (error: any) {
        if (error?.response?.status === 401 && refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken)
          if (!newAccessToken) throw new Error('Unauthorized')

          config.headers.Authorization = `Bearer ${newAccessToken}`
          return await requestFn(...args)
        }

        throw error
      }
    }
    return await requestFn(...args)
  } catch (error: any) {
    if (error.response.status === 403) {
      window.location.href = '/user/login?redirect=' + window.location.pathname
      throw new Error('Forbidden')
    }

    console.error('[apiClient] error', error)
    if (!manualErrorHandle) {
      const parsedMessage = getErrorMessage(error?.response?.data?.message)
      if (typeof window !== 'undefined') {
        const { openPopup } = usePopupStore.getState()
        openPopup('', parsedMessage)
      } else {
        throw new Error(parsedMessage)
      }
    }
    throw error
  }
}

async function refreshAccessToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    const res = await fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!res.ok) return null
    const { accessToken } = await res.json()
    console.log('[apiClient][refreshAccessToken] success')
    return accessToken
  } catch (e) {
    console.error('[apiClient][refreshAccessToken] Failed:', e)
    return null
  }
}

export { apiClient }
