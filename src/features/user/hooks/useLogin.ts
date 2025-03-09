import { useMutation } from '@tanstack/react-query'
import type { USER } from '#/generate' // 적절한 경로로 수정
import { login } from '@/entities/user/api' // login API 함수의 경로를 수정

/**
 * 로그인 Mutation Hook
 * @param manualErrorHandle - api 호출 에러 수동 처리 여부
 * @returns mutate - 로그인 요청 함수
 * @returns isLoading - 요청 진행 여부
 * @returns isError - 에러 발생 여부
 * @returns data - 응답 데이터
 * @returns error - 에러 객체
 */
export const useLogin = (manualErrorHandle = false) => {
  return useMutation<USER.LoginResDTO, Error, USER.LoginReqDTO>({
    mutationFn: (data) => login(data, manualErrorHandle),
  })
}
