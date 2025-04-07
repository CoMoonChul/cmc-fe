import { useMutation, useQueryClient } from '@tanstack/react-query'
import { expel } from '@/entities/group/api'
import type { GROUP } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 그룹 멤버 내보내기
 */
export const useExpelGroupMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<GROUP.ExpelResDTO, Error, GROUP.ExpelReqDTO>({
    mutationFn: (data) => expel(data),
    onSuccess: (data, variables) => {
      const { groupId } = variables
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP.DETAIL, groupId],
      })
    },
  })
}
