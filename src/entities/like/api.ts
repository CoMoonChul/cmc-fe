import { LIKE } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'
import { getApiConfig } from '@/shared/config/apiConfig'
import { axiosInstance } from '@/shared/config/axiosInstance'

const config = getApiConfig()
const api = new LIKE.LikeControllerApi(config, config.basePath, axiosInstance)

/**
 * 리뷰 좋아요 상태조회
 * @param id reviewId
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 리뷰 좋아요 상태 반환
 */
export async function selectReviewLikeState(
  id: number,
  manualErrorHandle = false,
): Promise<LIKE.SelectReviewLikeStateResDTO> {
  const response = await apiClient(
    api.selectReviewLikeState.bind(api),
    manualErrorHandle,
    id,
  )
  return response.data
}

/**
 * 리뷰 좋아요 생성/업데이트
 * @param data UpdateReviewLikeReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 생성/업데이트된 리뷰 좋아요 정보
 */
export async function updateReviewLike(
  data: LIKE.UpdateReviewLikeReqDTO,
  manualErrorHandle = false,
): Promise<LIKE.UpdateReviewLikeResDTO> {
  const response = await apiClient(
    api.updateReviewLike.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 리뷰 좋아요 삭제
 * @param data DeleteReviewLikeReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 삭제된 리뷰 좋아요 정보
 */
export async function deleteReviewLike(
  data: LIKE.DeleteReviewLikeReqDTO,
  manualErrorHandle = false,
): Promise<LIKE.DeleteReviewLikeResDTO> {
  const response = await apiClient(
    api.deleteReviewLike.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}
