/**
 * 백엔드에서 반환한 에러 메시지파싱 "[%s] %s" 중 %s 부분만 반환
 * @param errorMessage 원본 에러 메시지
 * @returns "[%s]" 부분을 제외한 에러 메시지
 */
export function getErrorMessage(errorMessage: string): string {
  const msg = errorMessage
    ? errorMessage.replace(/\[.*?\]\s*/, '')
    : '알 수 없는 에러가 발생하였습니다.'
  return msg
}
