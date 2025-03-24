import { useMutation } from '@tanstack/react-query'
import { updateVoteBattle } from '@/entities/battle/api'
import type { BATTLE } from '#/generate'

/**
 * 배틀 투표
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 */
export const useUpdateVoteBattle = (manualErrorHandle: boolean = false) => {
  return useMutation<
    BATTLE.UpdateVoteBattleResDTO,
    Error,
    BATTLE.UpdateVoteBattleReqDTO
  >({
    mutationFn: (data) => updateVoteBattle(data, manualErrorHandle),
    retry: false,
  })
}
