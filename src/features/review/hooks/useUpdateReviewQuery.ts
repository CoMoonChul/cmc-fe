import { REVIEW } from '#/generate'
import { updateReview } from '@/entities/review/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../types'

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
        queryKey: [QUERY_KEYS.REVIEW.LIST],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.REVIEW.DETAIL, reviewId],
      })
    },
  })
}
