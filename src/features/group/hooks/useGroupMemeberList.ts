import { useQuery } from '@tanstack/react-query'
import { getGroupMemberList } from '@/entities/group/api'
import type { GROUP } from '#/generate'

/**
 * 그룹 멤버 리스트 조회
 */
export const useGetGroupMemberList = (groupId: string) => {
  return useQuery<GROUP.GetGroupMemberListResDTO, Error>({
    queryKey: ['groupMemberList', groupId],
    queryFn: () => getGroupMemberList(groupId),
    enabled: !!groupId,
  })
}
