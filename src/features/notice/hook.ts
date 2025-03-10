import { useQuery } from '@tanstack/react-query'
import { NOTICE } from '#/generate'
import { selectPageNotice } from '@/entities/notification/api'

export const useNotices = (page: number, size: number) => {
  console.log('1', page)

  console.log('2', size)
  return useQuery<NOTICE.SelectNoticeListDTO>({
    queryKey: ['notices', page, size],
    queryFn: () => selectPageNotice(page, size ?? 10),
  })
}
