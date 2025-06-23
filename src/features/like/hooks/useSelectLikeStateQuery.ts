import { useQuery } from '@tanstack/react-query'
import { selectReviewLikeState } from '@/entities/like/api'
import { LIKE } from '#/generate'
import { likeKeys } from '../types'

/**
 * id에 해당하는 리뷰 좋아요 상태 조회 쿼리
 * @param id 리뷰 id
 * @param enabled 쿼리 수행 여부
 * @returns API 응답 데이터
 */
export const useSelectLikeStateQuery = (
  id: number,
  enabled: boolean = true,
) => {
  return useQuery<LIKE.SelectReviewLikeStateResDTO>({
    queryKey: likeKeys.state(id),
    queryFn: () => selectReviewLikeState(id),
    enabled: enabled,
    retry: false,
  })
}
