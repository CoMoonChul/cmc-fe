import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteGroup } from '@/entities/group/api'
import { GROUP } from '#/generate'
import { groupKeys } from '../types'

/**
 * 그룹 삭제 mutation
 * @param battleId 그룹 id
 */
export const useDeleteGroupMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<GROUP.DeleteResDTO, Error, GROUP.DeleteReqDTO>({
    mutationFn: (data) => deleteGroup(data),
    onSuccess: (data, variables) => {
      const { groupId } = variables
      queryClient.invalidateQueries({
        queryKey: groupKeys.list(),
      })
      queryClient.invalidateQueries({
        queryKey: groupKeys.detail(groupId),
      })
    },
  })
}
