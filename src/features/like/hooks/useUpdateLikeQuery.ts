import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateReviewLike } from '@/entities/like/api'
import type { LIKE } from '#/generate'
import { likeKeys } from '@/features/like/types'
import { reviewKeys } from '@/features/review/types'

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
      // 좋아요 상태
      queryClient.invalidateQueries({
        queryKey: likeKeys.state(reviewId),
      })
      // 리뷰 리스트에 좋아요 상태 갱신
      queryClient.invalidateQueries({
        queryKey: reviewKeys.list(),
      })
    },
    retry: false,
  })
}
