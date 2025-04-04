import { useQuery } from '@tanstack/react-query'
import { getMyGroupList } from '@/entities/group/api'
import { GROUP } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 내 그룹 정보 조회
 * @returns API 응답 데이터
 */
export const useGetMyGroupList = () => {
  return useQuery<GROUP.GetMyGroupListResDTO>({
    queryKey: [QUERY_KEYS.GROUP.LIST],
    queryFn: () => getMyGroupList(),
  })
}
