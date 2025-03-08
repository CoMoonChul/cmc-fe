import { useQuery } from '@tanstack/react-query'
import { selectBattle } from '@/entities/battle/api'
import { BATTLE } from '#/generate'

/**
 * battleId에 해당하는 배틀 상세 정보를 불러오는 Query
 * @param battleId 배틀 id
 * @returns API 응답 데이터
 */
export const useBattleDetailQuery = (battleId: number) => {
  return useQuery<BATTLE.SelectBattleResDTO>({
    queryKey: ['battleDetail', battleId],
    queryFn: () => selectBattle(battleId),
  })
}
