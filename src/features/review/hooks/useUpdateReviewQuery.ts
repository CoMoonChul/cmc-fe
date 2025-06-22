import { REVIEW } from '#/generate'
import { updateReview } from '@/entities/review/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewKeys } from '../types'

/*
 * 리뷰 수정
 */
export const useUpdateReviewQuery = (reviewId: number) => {
  const queryClient = useQueryClient()

  return useMutation<
    REVIEW.UpdateReviewResDTO,
    Error,
    REVIEW.UpdateReviewReqDTO
  >({
    mutationFn: (data) => updateReview(data),
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
