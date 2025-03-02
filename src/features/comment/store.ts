import { create } from 'zustand'
import {
  selectCommentList,
  createComment,
  deleteComment,
  updateComment,
} from '@/entities/comment/api'
import { COMMENT } from '#/generate'

interface CommentStore {
  commentData: COMMENT.SelectCommentListResDTO | null
  isLoading: boolean
  fetchComments: (targetId: number, commentTarget: number) => Promise<void>
  addComment: (data: COMMENT.CreateCommentReqDTO) => Promise<void>
  removeComment: (data: COMMENT.DeleteCommentReqDTO) => Promise<void>
  editComment: (data: COMMENT.UpdateCommentReqDTO) => Promise<void>
}

export const useCommentStore = create<CommentStore>((set) => ({
  commentData: null,
  isLoading: false,

  fetchComments: async (targetId, commentTarget) => {
    set({ isLoading: true })
    try {
      const data = await selectCommentList(targetId, commentTarget)
      set({ commentData: data })
    } catch (error) {
      console.error('댓글 목록 불러오기 실패:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  addComment: async (data) => {
    await createComment(data)
  },

  removeComment: async (data) => {
    await deleteComment(data)
  },

  editComment: async (data) => {
    await updateComment(data)
  },
}))
