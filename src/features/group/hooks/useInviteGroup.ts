import { useMutation } from '@tanstack/react-query'
import { invite } from '@/entities/group/api'
import type { GROUP } from '#/generate'

/**
 * 그룹 초대
 */
export const useInviteGroup = () => {
  return useMutation<GROUP.InviteResDTO, Error, GROUP.InviteReqDTO>({
    mutationFn: (data) => invite(data),
  })
}
