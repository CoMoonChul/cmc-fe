import { REVIEW } from '#/generate'
import { createReview } from '@/entities/review/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewKeys } from '../types'

/*
 * 리뷰 생성
 */
export const useCreateReviewQuery = () => {
  const queryClient = useQueryClient()

  return useMutation<
    REVIEW.CreateReviewResDTO,
    Error,
    REVIEW.CreateReviewReqDTO
  >({
    mutationFn: (data) => createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.list(),
      })
    },
  })
}
