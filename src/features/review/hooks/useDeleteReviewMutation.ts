import { useMutation, useQueryClient } from '@tanstack/react-query'
import { REVIEW } from '#/generate'
import { reviewKeys } from '../types'
import { deleteReview } from '@/entities/review/api'

/**
 * 리뷰 삭제 mutation
 * @param reviewId 리뷰 id
 */
export const useDeleteReviewMutation = (reviewId: number) => {
  const queryClient = useQueryClient()

  return useMutation<
    REVIEW.DeleteReviewResDTO,
    Error,
    REVIEW.DeleteReviewReqDTO
  >({
    mutationFn: (data) => deleteReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.list(),
      })
      queryClient.invalidateQueries({
        queryKey: reviewKeys.detail(reviewId),
      })
    },
  })
}
