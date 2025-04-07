import { useMutation } from '@tanstack/react-query'
import { logoutNext } from '@/entities/user/api'

/**
 * 로그인 Mutation Hook
 * @returns mutate - 로그인 요청 함수
 */
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => logoutNext(),
  })
}
