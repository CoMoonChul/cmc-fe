import { useQuery } from '@tanstack/react-query'
import { selectBattle } from '@/entities/battle/api'
import { BATTLE } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * battleId에 해당하는 배틀 상세 정보를 불러오는 Query
 * @param battleId 배틀 id
 * @param enabled 쿼리 수행 여부
 * @returns API 응답 데이터
 */
export const useBattleDetailQuery = (
  battleId: number,
  enabled: boolean = true,
) => {
  return useQuery<BATTLE.SelectBattleResDTO>({
    queryKey: [QUERY_KEYS.BATTLE.DETAIL, battleId],
    queryFn: () => selectBattle(battleId),
    enabled: enabled,
  })
}
