import { useMutation, useQueryClient } from '@tanstack/react-query'
import { invite } from '@/entities/group/api'
import type { GROUP } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 그룹 초대
 */
export const useInviteGroupMutation = (manualErrorHandle: boolean) => {
  const queryClient = useQueryClient()
  return useMutation<GROUP.InviteResDTO, Error, GROUP.InviteReqDTO>({
    mutationFn: (data) => invite(data, manualErrorHandle),
    onSuccess: (data, variables) => {
      const { groupId } = variables
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP.DETAIL, groupId],
      })
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP.DETAIL],
      })
    },
  })
}
