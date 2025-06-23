import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNotice } from '@/entities/notification/api'
import { noticeKeys } from '@/features/notice/types'
import { NOTICE } from '#/generate'

/**
 * @description 알림 삭제 단건 Query
 */
export const useDeleteNoticeQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: NOTICE.DeleteNoticeReqDTO) => deleteNotice(data),
    onSuccess: () => {
      // 성공시 캐시 무효화 리렌더링
      queryClient.invalidateQueries({ queryKey: noticeKeys.list() })
    },
    onError: (error) => {
      console.error('삭제 오류:', error)
      alert('알림 삭제에 실패했습니다.')
    },
  })
}
