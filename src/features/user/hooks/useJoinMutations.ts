import { useMutation } from '@tanstack/react-query'
import { join } from '@/entities/user/api'
import type { USER } from '#/generate'

/**
 * 회원가입
 */
export const useJoinMutations = () => {
  return useMutation<USER.JoinResDTO, Error, USER.JoinReqDTO>({
    mutationFn: (data) => join(data),
  })
}
