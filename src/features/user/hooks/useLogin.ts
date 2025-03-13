import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginNext } from '@/entities/user/api'

/**
 * 로그인 Mutation Hook
 * @returns mutate - 로그인 요청 함수
 */
export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, password }: { userId: string; password: string }) =>
      loginNext(userId, password),
    onSuccess: (data) => {
      queryClient.setQueryData(['authUser'], data)
    },
    onError: (error) => {
      console.error('[useLogin][error]', error)
    },
  })
}
