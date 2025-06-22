import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment } from '@/entities/comment/api'
import type { COMMENT } from '#/generate'
import { commentKeys } from '../types'

/**
 * 댓글
 */
export const useCreateCommentQuery = (
  targetId: number,
  commentTarget: number,
  pageSize = 10,
) => {
  const queryClient = useQueryClient()

  return useMutation<
    COMMENT.CreateCommentResDTO,
    Error,
    COMMENT.CreateCommentReqDTO
  >({
    mutationFn: (data) => createComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(targetId, commentTarget, pageSize),
      })
    },
  })
}
