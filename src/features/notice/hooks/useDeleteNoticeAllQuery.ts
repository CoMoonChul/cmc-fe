import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNoticeAll } from '@/entities/notification/api'
import { QUERY_KEYS } from '@/features/notice/types'
import { NOTICE } from '#/generate'

/**
 * @description 전체 알림삭제 Query
 */
export const useDeleteNoticeAllQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteNoticeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTICE.LIST] })
    },
    onError: (error) => {
      console.error('삭제 오류:', error)
      alert('전체 알림 삭제에 실패했습니다.')
    },
  })
}
