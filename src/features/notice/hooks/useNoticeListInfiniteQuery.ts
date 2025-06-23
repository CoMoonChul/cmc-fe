import { useInfiniteQuery } from '@tanstack/react-query'
import { noticeKeys } from '@/features/notice/types'
import { selectPageNotice } from '@/entities/notification/api'
import { NOTICE } from '#/generate'

/**
 * @description 알림 조회 infinity Query
 * @param page
 * @param size
 */
export const useNoticeListInfiniteQuery = (page: number, size: number) => {
  return useInfiniteQuery<NOTICE.SelectNoticeListDTO>({
    queryKey: noticeKeys.list(page, size),
    queryFn: ({ pageParam }) => selectPageNotice(pageParam as number, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.totalPages ?? 0
      const currentPage = lastPage.pageNumber ?? 0
      return totalPages - 1 > currentPage ? currentPage + 1 : undefined
    },
  })
}
