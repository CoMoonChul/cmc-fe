import { useMutation, useQueryClient } from '@tanstack/react-query'
import { invite } from '@/entities/group/api'
import type { GROUP } from '#/generate'
import { groupKeys } from '../types'

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
        queryKey: groupKeys.detail(groupId),
      })
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: groupKeys.all,
      })
    },
  })
}
