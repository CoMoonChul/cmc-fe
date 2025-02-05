class BrowserHelper {
  /**
   * Server (SSR: Server Side Rendering) 여부 확인
   */
  static isServer(): boolean {
    return typeof window === 'undefined'; // window 객체가 없으면 서버사이드 렌더링
  }

  /**
   * userAgent 반환
   */
  static getUserAgent(): string {
    return navigator.userAgent;
  }
}

export default BrowserHelper;