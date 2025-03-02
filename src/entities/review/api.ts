import { Configuration } from '#/generate/configuration'
import { REVIEW } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'

const api = new REVIEW.ReviewControllerApi(
  new Configuration({ basePath: '/api' }),
)

/**
 * 리뷰 단건 조회
 * @param reviewId 리뷰 ID
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 조회된 리뷰 정보
 */
export async function selectReview(
  reviewId: number,
  manualErrorHandle = false,
): Promise<REVIEW.SelectReviewResDTO> {
  const response = await apiClient(
    api.selectReview.bind(api),
    manualErrorHandle,
    { review_id: reviewId },
  )
  return response.data
}

/**
 * 리뷰 리스트 조회
 * @param pageNumber 페이지 번호 (0부터 시작, 기본값: 0)
 * @param pageSize 한 페이지당 리뷰 개수 (기본값: 10)
 * @param sort 정렬 기준 (기본값: "createdAt")
 * @param order 정렬 순서 (기본값: "desc")
 * @param keyword 검색 키워드 (선택)
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 리뷰 리스트 조회 결과
 */
export async function selectReviewList(
  pageNumber = 0,
  pageSize = 10,
  sort: 'createdAt' | 'updatedAt' | 'title' = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
  keyword?: string,
  manualErrorHandle = false,
): Promise<REVIEW.SelectReviewListResDTO> {
  const response = await apiClient(
    api.selectReviewList.bind(api),
    manualErrorHandle,
    {
      pageNumber,
      pageSize,
      sort,
      order,
      keyword,
    },
  )
  return response.data
}

/**
 * 리뷰 생성
 * @param data CreateReviewReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
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
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
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
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
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
