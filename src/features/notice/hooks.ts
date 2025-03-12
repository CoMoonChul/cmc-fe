import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NOTICE } from '#/generate'
import { deleteNotice, selectPageNotice } from '@/entities/notification/api'

export const useNotices = (page: number, size: number) => {
  return useQuery<NOTICE.SelectNoticeListDTO>({
    queryKey: ['notices', page, size],
    queryFn: () => selectPageNotice(page, size ?? 10),
  })
}

export const useDeleteNoticeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: NOTICE.DeleteNoticeReqDTO) => deleteNotice(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['notices']) // 삭제 후 알림 목록 새로고침
    },
    onError: (error) => {
      console.error('삭제 오류:', error)
      alert('알림 삭제에 실패했습니다.')
    },
  })
}
