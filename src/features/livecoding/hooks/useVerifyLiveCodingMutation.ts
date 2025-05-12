import { useMutation } from '@tanstack/react-query'
import { verifyLiveCoding } from '@/entities/livecoding/api'
import type { LIVECODING } from '#/generate'
/**
 * 라이브 코딩 토큰 검증
 */
export const useVerifyLiveCodingMutation = () => {
  return useMutation<
    LIVECODING.VerifyLiveCodingResDTO,
    Error,
    LIVECODING.VerifyLiveCodingReqDTO
  >({
    mutationFn: (data) => verifyLiveCoding(data),
    retry: false,
  })
}
