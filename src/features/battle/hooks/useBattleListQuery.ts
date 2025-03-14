import { useQuery } from '@tanstack/react-query'
import { selectBattleList } from '@/entities/battle/api'
import { BATTLE } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 배틀 리스트 조회 Query
 * @param condition 조회 조건(0:최신순, 1:투표순, 2:로그인회원작성, 3:로그인회원투표참여)
 * @param page 페이지 번호
 * @param size 페이지 사이즈
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 배틀 리스트
 */
export const useBattleListQuery = (
  condition: number,
  page: number,
  size: number,
  manualErrorHandle: boolean,
) => {
  return useQuery<BATTLE.SelectBattleListResDTO>({
    queryKey: [QUERY_KEYS.BATTLE.LIST, condition, page, size],
    queryFn: () => selectBattleList(condition, page, size, manualErrorHandle),
  })
}
