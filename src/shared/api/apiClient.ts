import { getErrorMessage } from '@/shared/lib/messages'

/**
 * 공통 API 요청 함수
 * @param requestFn API 요청 함수
 * @param args API 요청에 전달할 인자
 * @param manualErrorHandle 자동으로 에러를 처리할지 여부 (기본값: `true`)
 * @returns API 응답 데이터
 */
async function apiClient<T>(
  requestFn: (...args: unknown[]) => Promise<T>,
  manualErrorHandle = true,
  ...args: unknown[]
): Promise<T> {
  try {
    return await requestFn(...args)
  } catch (error) {
    if (manualErrorHandle) {
      alert(getErrorMessage(parseError(error)))
    }
    throw error
  }
}

/**
 * 에러 객체에서 메시지를 추출
 * @param error 에러 객체
 * @returns 에러 메시지 (기본값: "알 수 없는 오류가 발생했습니다.")
 */
function parseError(error: unknown): string {
  return (
    (error as { response?: { data?: { message?: string } } })?.response?.data
      ?.message ?? '알 수 없는 오류가 발생했습니다.'
  )
}

export { apiClient }
