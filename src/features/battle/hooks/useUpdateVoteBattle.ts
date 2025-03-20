import { useMutation } from '@tanstack/react-query'
import { updateVoteBattle } from '@/entities/battle/api'
import type { BATTLE } from '#/generate'

export const useUpdateVoteBattle = () => {
  return useMutation<
    BATTLE.UpdateVoteBattleResDTO,
    Error,
    BATTLE.UpdateVoteBattleReqDTO
  >({
    mutationFn: (data) => updateVoteBattle(data),
  })
}
