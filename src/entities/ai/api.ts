import { AI } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'
import { getApiConfig } from '@/shared/config/apiConfig'
import { axiosInstance } from '@/shared/config/axiosInstance'

const config = getApiConfig()
const api = new AI.AiControllerApi(config, config.basePath, axiosInstance)

/**
 * ai 댓글 단건 조회
 * @param reviewId 리뷰 ID
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 조회된 댓글 정보
 */
export async function selectAIComment(
  reviewId: number,
  manualErrorHandle = false,
): Promise<AI.SelectAICommentResDTO> {
  const response = await apiClient(
    api.selectAIComment.bind(api),
    manualErrorHandle,
    reviewId,
  )
  return response.data
}
