import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBattle } from '@/entities/battle/api'
import { BATTLE } from '#/generate'
import { QUERY_KEYS, battleKeys } from '../types'

/**
 * 배틀 삭제 mutation
 * @param battleId 배틀 id
 */
export const useDeleteCommentMutation = (battleId: number) => {
  const queryClient = useQueryClient()

  return useMutation<
    BATTLE.DeleteBattleResDTO,
    Error,
    BATTLE.DeleteBattleReqDTO
  >({
    mutationFn: (data) => deleteBattle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BATTLE.LIST],
      })
      queryClient.invalidateQueries({
        queryKey: battleKeys.detail(battleId),
      })
    },
  })
}
