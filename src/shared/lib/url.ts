/**
 * 주어진 URL 문자열의 도메인을 현재 사이트 도메인으로 교체합니다.
 * @param url 전체 URL (예: http://localhost:3000/livecoding/join?token=...)
 * @returns 현재 도메인으로 교체된 URL
 */
export const replaceDomainWithCurrent = (url: string): string => {
  try {
    const inputUrl = new URL(url)
    const currentOrigin = window.location.origin
    return currentOrigin + inputUrl.pathname + inputUrl.search + inputUrl.hash
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('유효하지 않은 URL입니다:', e.message)
    } else {
      console.error('알 수 없는 오류입니다:', e)
    }
    return url
  }
}
