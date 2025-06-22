import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteComment } from '@/entities/comment/api'
import { COMMENT } from '#/generate'
import { commentKeys } from '../types'

/**
 * 특정 댓글 삭제 Mutation
 * @param id 댓글 id
 */
export const useDeleteCommentMutation = (
  targetId: number,
  commentTarget: number,
  size: number,
) => {
  const queryClient = useQueryClient()

  return useMutation<
    COMMENT.DeleteCommentResDTO,
    Error,
    COMMENT.DeleteCommentReqDTO
  >({
    mutationFn: (data) => deleteComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(targetId, commentTarget, size),
      })
    },
  })
}
