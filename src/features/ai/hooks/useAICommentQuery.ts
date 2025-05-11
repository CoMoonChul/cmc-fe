import { useQuery } from '@tanstack/react-query'
import { selectAIComment } from '@/entities/ai/api'
import { AI } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * reviewId에 해당하는 ai 댓글
 * @param reviewId 리뷰 id
 * @returns API 응답 데이터
 */
export const useAICommentQuery = (reviewId: number) => {
  return useQuery<AI.SelectAICommentResDTO>({
    queryKey: [QUERY_KEYS.AI.DETAIL, reviewId],
    queryFn: () => selectAIComment(reviewId),
    staleTime: 1000 * 60 * 5, // 10 min
    gcTime: 1000 * 60 * 30, // 30 min
  })
}
