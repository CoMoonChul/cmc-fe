import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import {
  selectCommentList,
  selectComment,
  deleteComment,
} from '@/entities/comment/api'
import { COMMENT } from '#/generate'
import { useCallback } from 'react'

/**
 * 특정 타겟의 댓글 목록을 가져오는 Query
 * @param targetId 리뷰 or 배틀 id
 * @param commentTarget 리뷰/배틀 구분자
 * @returns API 응답 데이터
 */
export const useComments = (targetId: number, commentTarget: number) => {
  return useQuery<COMMENT.SelectCommentListResDTO>({
    queryKey: ['comments', targetId, commentTarget],
    queryFn: () => selectCommentList(targetId, commentTarget),
  })
}

/**
 * 특정 타겟의 댓글을 가져오는 Query
 * @param id 댓글 id
 * @returns API 응답 데이터
 */
export const useComment = (id: number) => {
  return useQuery<COMMENT.SelectCommentResDTO>({
    queryKey: ['comment', id],
    queryFn: () => selectComment(id),
    staleTime: 2000,
    gcTime: 2000,
  })
}

/**
 * 특정 댓글을 미리 가져오는 Prefetch 함수
 * @param id 댓글 id
 */
export const usePrefetchComment = () => {
  const queryClient = useQueryClient()

  return useCallback(
    (id: number) => {
      queryClient.prefetchQuery({
        queryKey: ['comment', id],
        queryFn: () => selectComment(id),
      })
    },
    [queryClient],
  )
}

/**
 * 특정 댓글 삭제 Mutation
 * @param id 댓글 id
 */
export const useDeleteCommentMutation = (data: COMMENT.DeleteCommentReqDTO) => {
  return useMutation({
    mutationFn: () => deleteComment(data),
  })
}
