import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/features/battle/types'

/**
 * 배틀 투표 상태 캐시 무효화 훅
 * @returns 배틀 투표 상태 캐시 무효화
 */
export const useInvalidateBattleVoteState = () => {
  const queryClient = useQueryClient()

  return (battleId: number) => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.BATTLE.VOTE_STATE, battleId] as const,
    })
  }
}
