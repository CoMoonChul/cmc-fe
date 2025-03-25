import * as pako from 'pako'

/**
 * 문자열을 Gzip으로 압축하고 Base64로 인코딩
 * @param {string} str 압축할 문자열
 * @returns {string} Base64 인코딩된 압축 데이터
 */
export const compressGzip = (str: string): string | null => {
  try {
    const binaryData = pako.gzip(str) // Gzip 압축 (Uint8Array 반환)
    return btoa(String.fromCharCode(...binaryData)) // Base64 인코딩
  } catch (error) {
    console.error('Gzip 압축 오류:', error)
    return null
  }
}

/**
 * Base64로 인코딩된 Gzip 데이터를 복호화
 * @param {string} compressedStr Base64로 인코딩된 압축 데이터
 * @returns {string} 복호화된 문자열
 */
export const decompressGzip = (compressedStr: string): string | null => {
  try {
    // Base64 디코딩 → Uint8Array 변환
    const binaryString = atob(compressedStr)
    const binaryData = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      binaryData[i] = binaryString.charCodeAt(i)
    }
    // Gzip 복호화
    return pako.ungzip(binaryData, { to: 'string' })
  } catch (error) {
    console.error('Gzip 복호화 오류:', error)
    return null
  }
}
