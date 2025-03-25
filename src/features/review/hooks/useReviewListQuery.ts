import { useQuery } from '@tanstack/react-query'
import { selectReviewList } from '@/entities/review/api'
import { REVIEW } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 리뷰 리스트 조회 Infinite Query
 * @param condition 조회 조건
 * @param keyword : 검색어
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 리뷰 리스트 무한 스크롤 데이터
 */
export const useReviewListQuery = (
  condition: number,
  pageNumber: number,
  pageSize: number = 10,
  manualErrorHandle: boolean,
) => {
  return useQuery<REVIEW.SelectReviewListResDTO>({
    queryKey: [QUERY_KEYS.REVIEW.LIST, condition, pageSize],
    queryFn: () =>
      selectReviewList(
        condition,
        pageNumber,
        pageSize,
        manualErrorHandle,
      ),
  })
}
