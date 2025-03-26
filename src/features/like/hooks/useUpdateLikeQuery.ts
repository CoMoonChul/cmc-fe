import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateReviewLike } from '@/entities/like/api'
import type { LIKE } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 리뷰 좋아요
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 */
export const useUpdateLike = (
  reviewId: number,
  manualErrorHandle: boolean = false,
) => {
  const queryClient = useQueryClient()

  return useMutation<
    LIKE.UpdateReviewLikeResDTO,
    Error,
    LIKE.UpdateReviewLikeReqDTO
  >({
    mutationFn: (data) => updateReviewLike(data, manualErrorHandle),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LIKE.STATE, reviewId],
      })
    },
    retry: false,
  })
}
