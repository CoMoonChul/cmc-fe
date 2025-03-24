import { useMutation } from '@tanstack/react-query'
import { findAccount } from '@/entities/user/api'
import type { USER } from '#/generate'

/**
 * 계정찾기
 */
export const useFindAccount = () => {
  return useMutation<USER.FindAccountResDTO, Error, USER.FindAccountReqDTO>({
    mutationFn: (data) => findAccount(data),
  })
}
