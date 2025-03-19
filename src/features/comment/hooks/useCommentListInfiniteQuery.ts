import { useInfiniteQuery } from '@tanstack/react-query'
import { selectCommentList } from '@/entities/comment/api'
import { COMMENT } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 특정 타겟의 댓글 조회 Infinite Query
 * @param targetId 리뷰 or 배틀 id
 * @param commentTarget 리뷰/배틀 구분자
 * @param size 페이지 사이즈
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns API 응답 데이터
 */
export const useCommentListInfiniteQuery = (
  targetId: number,
  commentTarget: number,
  size: number = 10,
  manualErrorHandle?: boolean,
) => {
  return useInfiniteQuery<COMMENT.SelectCommentListResDTO>({
    queryKey: [QUERY_KEYS.COMMENT.LIST, targetId, commentTarget, size],
    queryFn: ({ pageParam }) =>
      selectCommentList(
        targetId,
        commentTarget,
        pageParam as number,
        size,
        manualErrorHandle,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.totalPages ?? 0
      const currentPage = lastPage.pageNumber ?? 0
      return totalPages - 1 > currentPage ? currentPage + 1 : undefined
    },
  })
}
