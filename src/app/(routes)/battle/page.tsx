'use client'
import { useBattleListInfiniteQuery } from '@/features/battle/hooks/useBattleListInfiniteQuery'
import BattleListDropDown from '@/features/battle/ui/BattleListDropDown'
import BattleListCard from '@/features/battle/ui/BattleListCard'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

const BattleListPage = () => {
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBattleListInfiniteQuery(0, 9, true)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          배틀 작성하기
        </button>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg dark:border-gray-600 overflow-visible">
          <button className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            최신
          </button>
          <button className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            인기
          </button>
          <BattleListDropDown />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.pages.map((page) =>
          page.battleList?.map((battle, index) => (
            <BattleListCard key={index} {...battle} />
          )),
        )}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          {isFetchingNextPage ? (
            <span>로딩 중.....</span>
          ) : (
            <span>더 불러오려면 스크롤하세요.</span>
          )}
        </div>
      )}
    </div>
  )
}

export default BattleListPage
