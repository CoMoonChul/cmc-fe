import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { USER } from '#/generate' // 적절한 경로로 수정
import { loginNext } from '@/entities/user/api' // login API 함수의 경로를 수정

/**
 * 로그인 Mutation Hook
 * @param manualErrorHandle - api 호출 에러 수동 처리 여부
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
