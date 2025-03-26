import { REVIEW } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'
import { getApiConfig } from '@/shared/config/apiConfig'
import { axiosInstance } from '@/shared/config/axiosInstance'

const config = getApiConfig()
const api = new REVIEW.ReviewControllerApi(
  config,
  config.basePath,
  axiosInstance,
)

/**
 * 리뷰 단건 조회
 * @param reviewId 리뷰 ID
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 조회된 리뷰 정보
 */
export async function selectReview(
  reviewId: number,
  manualErrorHandle = false,
): Promise<REVIEW.SelectReviewResDTO> {
  const response = await apiClient(
    api.selectReview.bind(api),
    manualErrorHandle,
    reviewId,
  )
  return response.data
}

/**
 * 리뷰 리스트 조회
 * @summary 리뷰 리스트 조회
 * @param {number} condition 조회 조건(0:최신순, 1:인기순, 2:로그인회원작성, 3:로그인회원답변, 4:로그인회원좋아요)
 * @param {number} [pageNumber] 페이지 번호 (0부터 시작)
 * @param {number} [pageSize] 한 페이지당 리뷰 개수
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 리뷰 리스트
 */
export async function selectReviewList(
  condition: number,
  pageNumber: number = 0,
  pageSize: number = 10,
  manualErrorHandle = false,
): Promise<REVIEW.SelectReviewListResDTO> {
  const response = await apiClient(
    api.selectReviewList.bind(api),
    manualErrorHandle,
    condition,
    pageNumber,
    pageSize,
  )
  return response.data
}

/**
 * 리뷰 생성
 * @param data CreateReviewReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 생성된 리뷰 정보
 */
export async function createReview(
  data: REVIEW.CreateReviewReqDTO,
  manualErrorHandle = false,
): Promise<REVIEW.CreateReviewResDTO> {
  const response = await apiClient(
    api.createReview.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 리뷰 삭제
 * @param data DeleteReviewReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 삭제 결과
 */
export async function deleteReview(
  data: REVIEW.DeleteReviewReqDTO,
  manualErrorHandle = false,
): Promise<REVIEW.DeleteReviewResDTO> {
  const response = await apiClient(
    api.deleteReview.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 리뷰 수정
 * @param data UpdateReviewReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 수정된 리뷰 정보
 */
export async function updateReview(
  data: REVIEW.UpdateReviewReqDTO,
  manualErrorHandle = false,
): Promise<REVIEW.UpdateReviewResDTO> {
  const response = await apiClient(
    api.updateReview.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}
