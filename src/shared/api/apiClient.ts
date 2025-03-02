/* tslint:disable */
/* eslint-disable */

import { getErrorMessage } from '@/shared/lib/messages'

/**
 * 공통 API 요청 함수
 * @param requestFn API 요청 함수
 * @param args API 요청에 전달할 인자
 * @param shouldHandleError 자동으로 에러를 처리할지 여부 (기본값: true)
 * @returns API 응답 데이터
 */
async function apiClient<T>(
  requestFn: (...args: any[]) => Promise<T>,
  manualErrorHandle: boolean = false,
  ...args: any[]
): Promise<T> {
  try {
    return await requestFn(...args)
  } catch (error: any) {
    if (!manualErrorHandle) {
      const parsedMessage = getErrorMessage(error?.response?.data?.message)
      alert(parsedMessage)
    }
    throw error
  }
}

export { apiClient }
