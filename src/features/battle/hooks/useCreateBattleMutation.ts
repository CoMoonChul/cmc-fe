import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBattle } from '@/entities/battle/api'
import type { BATTLE } from '#/generate'
import { battleKeys } from '../types'
/**
 * 배틀 생성
 */
export const useCreateBattleMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    BATTLE.CreateBattleResDTO,
    Error,
    BATTLE.CreateBattleReqDTO
  >({
    mutationFn: (data) => createBattle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: battleKeys.list(),
      })
    },
  })
}
