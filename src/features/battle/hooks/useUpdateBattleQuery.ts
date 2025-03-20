import { useMutation } from '@tanstack/react-query'
import { updateBattle } from '@/entities/battle/api'
import type { BATTLE } from '#/generate'

/**
 * 배틀 수정
 */
export const useUpdateBattleQuery = () => {
  return useMutation<
    BATTLE.UpdateBattleResDTO,
    Error,
    BATTLE.UpdateBattleReqDTO
  >({
    mutationFn: (data) => updateBattle(data),
  })
}
