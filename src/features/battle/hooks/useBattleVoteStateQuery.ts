import { useQuery } from '@tanstack/react-query'
import { selectBattleVoteState } from '@/entities/battle/api'
import { BATTLE } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * battleId에 해당하는 배틀 상세 정보를 불러오는 Query
 * @param battleId 배틀 id
 * @returns API 응답 데이터
 */
export const useBattleVoteStateQuery = (battleId: number) => {
  return useQuery<BATTLE.SelectBattleVoteStateResDTO>({
    queryKey: [QUERY_KEYS.BATTLE.VOTE_STATE, battleId],
    queryFn: () => selectBattleVoteState(battleId),
    retry: false,
  })
}
