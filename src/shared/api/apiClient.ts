/* tslint:disable */
/* eslint-disable */
import { getErrorMessage } from '@/shared/lib/messages'
import { redirect } from 'next/navigation'
import { usePopupStore } from '../store/usePopupStore'

/**
 * 공통 API 요청 함수
 * @param requestFn API 요청 함수
 * @param args API 요청에 전달할 인자
 * @param shouldHandleError 자동으로 에러를 처리할지 여부 (기본값: false)
 * @returns API 응답 데이터
 */
async function apiClient<T>(
  requestFn: (...args: any[]) => Promise<T>,
  manualErrorHandle: boolean = false,
  ...args: any[]
): Promise<T> {
  // 서버 or 클라이언트 컴포넌트 호출 여부
  const isClient = typeof window !== 'undefined'

  try {
    return await requestFn(...args)
  } catch (error: any) {
    console.error('[apiClient] error', error)
    if (!manualErrorHandle) {
      const parsedMessage = getErrorMessage(error?.response?.data?.message)

      // 클라이언트 컴포넌트의 경우 얼럿 노출
      if (isClient) {
        const { openPopup } = usePopupStore.getState()
        openPopup('에러', parsedMessage)
        // 서버 컴포넌트의 경우 500 에러 페이지 리다이렉트
      } else {
        redirect('/500')
      }
    }
    throw error
  }
}

export { apiClient }
