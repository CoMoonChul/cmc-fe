import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBattle } from '@/entities/battle/api'
import type { BATTLE } from '#/generate'
import { battleKeys } from '../types'

/**
 * 배틀 수정
 */
export const useUpdateBattleQuery = (battleId: number) => {
  const queryClient = useQueryClient()

  return useMutation<
    BATTLE.UpdateBattleResDTO,
    Error,
    BATTLE.UpdateBattleReqDTO
  >({
    mutationFn: (data) => updateBattle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: battleKeys.detail(battleId),
      })
      queryClient.invalidateQueries({
        queryKey: battleKeys.list(),
      })
    },
  })
}
