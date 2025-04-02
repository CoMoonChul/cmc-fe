import { useMutation } from '@tanstack/react-query'
import { create } from '@/entities/group/api'
import type { GROUP } from '#/generate'

/**
 * 그룹 생성
 */
export const useCreateGroup = () => {
  return useMutation<GROUP.CreateResDTO, Error, GROUP.CreateReqDTO>({
    mutationFn: (data) => create(data),
  })
}
