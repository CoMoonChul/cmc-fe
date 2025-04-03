import { useMutation } from '@tanstack/react-query'
import { expel } from '@/entities/group/api'
import type { GROUP } from '#/generate'

/**
 * 그룹 멤버 내보내기
 */
export const useCreateGroup = () => {
  return useMutation<GROUP.ExpelResDTO, Error, GROUP.ExpelReqDTO>({
    mutationFn: (data) => expel(data),
  })
}
