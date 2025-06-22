import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBattle } from '@/entities/battle/api'
import { BATTLE } from '#/generate'
import { battleKeys } from '../types'

/**
 * 배틀 삭제 mutation
 * @param battleId 배틀 id
 */
export const useDeleteBattleMutation = (battleId: number) => {
  const queryClient = useQueryClient()

  return useMutation<
    BATTLE.DeleteBattleResDTO,
    Error,
    BATTLE.DeleteBattleReqDTO
  >({
    mutationFn: (data) => deleteBattle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: battleKeys.list(),
      })
      queryClient.removeQueries({
        queryKey: battleKeys.detail(battleId),
      })
    },
  })
}
