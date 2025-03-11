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

/**
 * 라이브코딩 방 조회
 * @param roomId - 조회할 방 ID
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 방 정보 조회
 */
export async function selectLiveCoding(
  roomId: string,
  manualErrorHandle = false,
): Promise<LIVECODING.SelectLiveCodingResDTO> {
  const response = await apiClient(
    api.selectLiveCoding.bind(api),
    manualErrorHandle,
    roomId,
  )
  return response.data
}

/**
 * 라이브코딩 삭제
 * @param data DeleteVoteBattleReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 삭제 성공 여부
 */
export async function deleteLiveCoding(
  data: LIVECODING.DeleteLiveCodingReqDTO,
  manualErrorHandle = false,
): Promise<LIVECODING.DeleteLiveCodingResDTO> {
  const response = await apiClient(
    api.deleteLiveCoding.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}
