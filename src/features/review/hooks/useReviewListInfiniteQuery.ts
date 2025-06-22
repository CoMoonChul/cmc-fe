import { useInfiniteQuery } from '@tanstack/react-query'
import { selectReviewList } from '@/entities/review/api'
import { REVIEW } from '#/generate'
import { reviewKeys } from '../types'

/**
 * 리뷰 리스트 조회 Infinite Query
 * @param pageSize 페이지 사이즈
 * @param sort : 생성일, 업데이트일, 제목별
 * @param order : 오름, 내림 차순
 * @param keyword : 검색어
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 리뷰 리스트 무한 스크롤 데이터
 */
export const useReviewListInfiniteQuery = (
  condition: number,
  pageSize: number = 10,
  manualErrorHandle: boolean,
) => {
  return useInfiniteQuery<REVIEW.SelectReviewListResDTO>({
    queryKey: reviewKeys.list(condition, pageSize),
    queryFn: ({ pageParam = 0 }) =>
      selectReviewList(
        condition,
        pageParam as number,
        pageSize as number,
        manualErrorHandle,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.totalPages ?? 0
      const currentPage = lastPage.pageNumber ?? 0
      return totalPages - 1 > currentPage ? currentPage + 1 : undefined
    },
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 30, // 30 min
    retry: false,
  })
}
