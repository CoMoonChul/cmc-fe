import { useInfiniteQuery } from '@tanstack/react-query'
import { selectBattleList } from '@/entities/battle/api'
import { BATTLE } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 배틀 리스트 조회 Infinite Query
 * @param condition 조회 조건(0:최신순, 1:투표순, 2:로그인회원작성, 3:로그인회원투표참여)
 * @param size 페이지 사이즈
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 배틀 리스트 무한 스크롤 데이터
 */
export const useBattleListInfiniteQuery = (
  condition: number,
  size: number = 10,
  manualErrorHandle: boolean,
) => {
  return useInfiniteQuery<BATTLE.SelectBattleListResDTO>({
    queryKey: [QUERY_KEYS.BATTLE.LIST, condition, size],
    queryFn: ({ pageParam }) =>
      selectBattleList(condition, pageParam as number, size, manualErrorHandle),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.totalPages ?? 0
      const currentPage = lastPage.pageNumber ?? 0
      return totalPages - 1 > currentPage ? currentPage + 1 : undefined
    },
  })
}
