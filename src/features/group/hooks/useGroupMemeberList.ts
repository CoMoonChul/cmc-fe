import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getGroupMemberList } from '@/entities/group/api'
import type { GROUP } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 그룹 멤버 리스트 조회
 */
export const useGetGroupMemberList = (
  groupId: number,
  options?: Partial<UseQueryOptions<GROUP.GetGroupMemberListResDTO, Error>>,
) => {
  return useQuery<GROUP.GetGroupMemberListResDTO, Error>({
    queryKey: [QUERY_KEYS.GROUP.DETAIL, groupId],
    queryFn: () => getGroupMemberList(groupId),
    ...options,
  })
}
