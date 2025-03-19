import { useMutation } from '@tanstack/react-query'
import { deleteComment } from '@/entities/comment/api'
import { COMMENT } from '#/generate'

/**
 * 특정 댓글 삭제 Mutation
 * @param id 댓글 id
 */
export const useDeleteCommentMutation = (data: COMMENT.DeleteCommentReqDTO) => {
  return useMutation({
    mutationFn: () => deleteComment(data),
  })
}
