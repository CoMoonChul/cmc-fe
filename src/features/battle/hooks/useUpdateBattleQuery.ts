import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBattle } from '@/entities/battle/api'
import type { BATTLE } from '#/generate'
import { QUERY_KEYS } from '../types'

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
        queryKey: [QUERY_KEYS.BATTLE.DETAIL, battleId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BATTLE.LIST],
      })
    },
  })
}
