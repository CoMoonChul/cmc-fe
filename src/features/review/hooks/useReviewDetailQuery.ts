import { useQuery } from '@tanstack/react-query'
import { selectReview } from '@/entities/review/api'
import { REVIEW } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * reviewId에 해당하는 게시글의 상세정보를 불러오는 Query
 * @param reviewId 리뷰 아이디
 * @param enabled 쿼리 수행 여부
 * @return API 응답 데이터
 */

export const useReviewDetailQuery = (
  reviewId: number,
  enabled: boolean = true,
) => {
  return useQuery<REVIEW.SelectReviewResDTO>({
    queryKey: [QUERY_KEYS.REVIEW.DETAIL, reviewId],
    queryFn: () => selectReview(reviewId),
    enabled: enabled,
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 30, // 30 min
  })
}
