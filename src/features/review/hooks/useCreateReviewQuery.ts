import { REVIEW } from '#/generate'
import { createReview } from '@/entities/review/api'
import { useMutation } from '@tanstack/react-query'

/*
 * 리뷰 생성
 */
export const useCreateReviewQuery = () => {
  return useMutation<
    REVIEW.CreateReviewResDTO,
    Error,
    REVIEW.CreateReviewReqDTO
  >({
    mutationFn: (data) => createReview(data),
  })
}
