import { useQuery } from '@tanstack/react-query'
import { selectBattle } from '@/entities/battle/api'
import { BATTLE } from '#/generate'
import { battleKeys } from '../types'

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
    queryKey: battleKeys.detail(battleId),
    queryFn: () => selectBattle(battleId),
    enabled: enabled,
    staleTime: 1000 * 60 * 5, // 10 min
    gcTime: 1000 * 60 * 30, // 30 min
  })
}
