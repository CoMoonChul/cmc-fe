/**
 * ai comment code에 붙은 backtick 제거 함수
 * @param {str} backtick 제거할 문자열
 * @returns {str} 정리된 문자열
 */
export const removeTripleBackticks = (str: string) => {
  if (str.startsWith('```') && str.endsWith('```')) {
    return str.slice(3, -3).trim()
  }
  return str
}
