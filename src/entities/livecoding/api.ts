import { LIVECODING } from '#/generate' // OpenAPI로 생성된 LIVECODING API
import { apiClient } from '@/shared/api/apiClient' // 공통 API 클라이언트
import { apiConfig } from '@/shared/config/apiConfig'
import { axiosInstance } from '@/shared/config/axiosInstance'

const api = new LIVECODING.LiveCodingControllerApi(
  apiConfig,
  apiConfig.basePath,
  axiosInstance,
)

/**
 * 라이브코딩 방 생성
 * @param data - CreateLiveCodingReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 생성된 방 정보
 */
export async function createLiveCoding(
  data: LIVECODING.CreateLiveCodingReqDTO,
  manualErrorHandle = false,
): Promise<LIVECODING.CreateLiveCodingResDTO> {
  const response = await apiClient(
    api.createLiveCoding.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}
