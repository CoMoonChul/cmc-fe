import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '@/entities/group/api'
import type { GROUP } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 그룹 생성
 */
export const useCreateGroup = () => {
  const queryClient = useQueryClient()
  return useMutation<GROUP.CreateResDTO, Error, GROUP.CreateReqDTO>({
    mutationFn: (data) => create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP.LIST],
      })
    },
  })
}
