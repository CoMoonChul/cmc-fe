import { useMutation } from '@tanstack/react-query'
import { createBattle } from '@/entities/battle/api'
import type { BATTLE } from '#/generate'

/**
 * 배틀 생성
 */
export const useCreateBattleQuery = () => {
  return useMutation<
    BATTLE.CreateBattleResDTO,
    Error,
    BATTLE.CreateBattleReqDTO
  >({
    mutationFn: (data) => createBattle(data),
  })
}
