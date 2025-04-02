import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '@/entities/user/api'
import type { USER } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 회원 정보 변경
 */
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<USER.UpdateResDTO, Error, USER.UpdateReqDTO>({
    mutationFn: (data) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER.DETAIL],
      })
    },
  })
}
