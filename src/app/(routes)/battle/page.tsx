'use client'

import { useBattleListInfiniteQuery } from '@/features/battle/hooks/useBattleListInfiniteQuery'
import BattleListDropDown from '@/features/battle/ui/BattleListDropDown'
import BattleListCard from '@/features/battle/ui/BattleListCard'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { usePopupStore } from '@/shared/store/usePopupStore'
import { useAuth } from '@/shared/hook/useAuth'
import { AxiosError } from 'axios'

const FILTERS = ['최신', '인기', '내가 작성한', '내가 참여한'] as const
type FilterType = (typeof FILTERS)[number]
const SEARCH_CONDITIONS: Record<FilterType, number> = {
  최신: 0,
  인기: 1,
  '내가 작성한': 2,
  '내가 참여한': 3,
}

const BattleListPage = () => {
  const router = useRouter()
  const checkAuth = useAuth()
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('최신')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const { openPopup } = usePopupStore.getState()
  const searchCondition = useMemo(
    () => SEARCH_CONDITIONS[selectedFilter],
    [selectedFilter],
  )
  const { ref, inView } = useInView()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useBattleListInfiniteQuery(searchCondition, 9, true)

  const goBattleForm = () => {
    router.push('/battle/form')
  }

  const onClickCreateBattle = async () => {
    const result = await checkAuth()
    if (!result) {
      openPopup(
        '로그인 후에 배틀을 등록할 수 있어요.',
        '로그인 하시겠습니까?',
        goBattleForm,
      )
      return
    }
    goBattleForm()
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  useEffect(() => {
    if (isError && error && error instanceof AxiosError) {
      if (error.response?.data.errorCode === 'BATTLE011') {
        openPopup('', '로그인 후에 가능합니다. 로그인하시겠습니까?', () =>
          router.push('/user/login?redirect=/battle'),
        )
        setSelectedFilter('최신')
      }
    }
  }, [isError, error, openPopup, router])

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <button
          onClick={onClickCreateBattle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
        >
          배틀 작성하기
        </button>

        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-visible">
          {FILTERS.slice(0, 2).map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter)
                setDropdownOpen(false)
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}

          <BattleListDropDown
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
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
            <span>로딩 중...</span>
          ) : (
            <span>더 불러오려면 스크롤하세요.</span>
          )}
        </div>
      )}
    </div>
  )
}

export default BattleListPage
