import { useQuery } from '@tanstack/react-query'
import { getMyGroupList } from '@/entities/group/api'
import { GROUP } from '#/generate'
import { groupKeys } from '../types'

/**
 * 내 그룹 정보 조회
 * @returns API 응답 데이터
 */
export const useGetMyGroupList = () => {
  return useQuery<GROUP.GetMyGroupListResDTO>({
    queryKey: groupKeys.list(),
    queryFn: () => getMyGroupList(),
    staleTime: 1000 * 60 * 5, // 10 min
    gcTime: 1000 * 60 * 30, // 30 min
  })
}
