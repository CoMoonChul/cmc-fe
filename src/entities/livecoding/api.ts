import { LIVECODING } from '#/generate' // OpenAPI로 생성된 LIVECODING API
import { apiClient } from '@/shared/api/apiClient' // 공통 API 클라이언트
import { getApiConfig } from '@/shared/config/apiConfig'
import { axiosInstance } from '@/shared/config/axiosInstance'

const config = getApiConfig()
const api = new LIVECODING.LiveCodingControllerApi(
  config,
  config.basePath,
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

/**
 * 라이브코딩방 업데이트
 * @param roomId
 * @param userNum
 * @param action 0 참여 1 나가기
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 삭제 성공 여부
 */
export async function updateLiveCoding(
  roomId: string,
  userNum: number,
  action: number,
  manualErrorHandle = false,
): Promise<LIVECODING.UpdateLiveCodingResDTO> {
  const response = await apiClient(
    api.updateLiveCoding.bind(api),
    manualErrorHandle,
    roomId,
    userNum,
    action,
  )
  return response.data
}

/**
 * 라이브코딩방 토큰 검증
 * @param token - jwt 토큰
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 삭제 성공 여부
 */
export async function verifyLiveCoding(
  token: string,
  manualErrorHandle = false,
): Promise<LIVECODING.VerifyLiveCodingResDTO> {
  const response = await apiClient(
    api.verifyLiveCoding.bind(api),
    manualErrorHandle,
    token,
  )
  return response.data
}

export async function selectLiveCodingSnippet(
  hostId: number,
  manualErrorHandle = false,
): Promise<LIVECODING.SelectLiveCodingSnippetResDTO> {
  const response = await apiClient(
    api.selectLiveCodingSnippet.bind(api),
    manualErrorHandle,
    hostId,
  )
  return response.data
}

export async function updateLiveCodingSnippet(
  roomId: string,
  hostId: number,
  diff: {
    start: number
    length: number
    text: string
  },
  language: string,
  cursorPos: {
    line: number
    ch: number
  },
  manualErrorHandle = false,
): Promise<LIVECODING.UpdateLiveCodingSnippetResDTO> {
  const response = await apiClient(
    api.updateLiveCodingSnippet.bind(api),
    manualErrorHandle,
    {
      roomId,
      hostId,
      diff,
      language,
      cursorPos,
    },
  )
  return response.data
}
