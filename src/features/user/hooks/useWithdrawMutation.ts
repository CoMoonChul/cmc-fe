import { useMutation } from '@tanstack/react-query'
import { withdraw } from '@/entities/user/api'
import { USER } from '#/generate'

/**
 * 회원 탈퇴 mutation
 */
export const useWithdrawMutation = () => {
  return useMutation<USER.WithdrawResDTO, Error, USER.WithdrawReqDTO>({
    mutationFn: (data) => withdraw(data),
  })
}
