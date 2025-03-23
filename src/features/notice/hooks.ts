import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { NOTICE } from '#/generate'
import {
  deleteNotice,
  deleteNoticeAll,
  selectPageNotice,
} from '@/entities/notification/api'
import { QUERY_KEYS } from '@/features/notice/types'

/**
 * 알림 리스트 조회 Infinite Query
 * @param page
 * @param size
 */
export const useNotices = (page: number, size: number) => {
  return useInfiniteQuery<NOTICE.SelectNoticeListDTO>({
    queryKey: [QUERY_KEYS.NOTICE.LIST, page, size],
    queryFn: ({ pageParam }) => selectPageNotice(pageParam as number, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.totalPages ?? 0
      const currentPage = lastPage.pageNumber ?? 0
      return totalPages - 1 > currentPage ? currentPage + 1 : undefined
    },
  })
}

export const useDeleteNoticeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: NOTICE.DeleteNoticeReqDTO) => deleteNotice(data),
    onSuccess: () => {
      // 성공시 캐시 무효화 리렌더링
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTICE.LIST] })
    },
    onError: (error) => {
      console.error('삭제 오류:', error)
      alert('알림 삭제에 실패했습니다.')
    },
  })
}

export const useDeleteNoticeAllMutation = () => {
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
