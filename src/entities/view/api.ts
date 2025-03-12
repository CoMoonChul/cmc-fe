import { VIEW } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'
import { apiConfig } from '@/shared/config/apiConfig'
import { axiosInstance } from '@/shared/config/axiosInstance'

const api = new VIEW.ViewControllerApi(
  apiConfig,
  apiConfig.basePath,
  axiosInstance,
)

/**
 * 리뷰 조회수 생성/업데이트
 * @param data UpdateReviewViewReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 조회수 업데이트 결과
 */
export async function updateReviewView(
  data: VIEW.UpdateReviewViewReqDTO,
  manualErrorHandle = false,
): Promise<VIEW.UpdateReviewViewResDTO> {
  const response = await apiClient(
    api.updateReviewView.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 배틀 조회수 생성/업데이트
 * @param data UpdateBattleViewReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 조회수 업데이트 결과
 */
export async function updateBattleView(
  data: VIEW.UpdateBattleViewReqDTO,
  manualErrorHandle = false,
): Promise<VIEW.UpdateBattleViewResDTO> {
  const response = await apiClient(
    api.updateBattleView.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}
