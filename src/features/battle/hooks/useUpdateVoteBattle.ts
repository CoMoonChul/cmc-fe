import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateVoteBattle } from '@/entities/battle/api'
import type { BATTLE } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 배틀 투표
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 */
export const useUpdateVoteBattle = (
  battleId: number,
  manualErrorHandle: boolean = false,
) => {
  const queryClient = useQueryClient()

  return useMutation<
    BATTLE.UpdateVoteBattleResDTO,
    Error,
    BATTLE.UpdateVoteBattleReqDTO
  >({
    mutationFn: (data) => updateVoteBattle(data, manualErrorHandle),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BATTLE.VOTE_STATE, battleId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BATTLE.LIST],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BATTLE.DETAIL, battleId],
      })
    },
  })
}
