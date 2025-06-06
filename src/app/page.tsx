'use client'
import { useReviewListInfiniteQuery } from '@/features/review/hooks/useReviewListInfiniteQuery'
import ReviewListCard from '@/features/review/ui/ReviewListCard'
import { useEffect, useState, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'
import ReviewListDropDown from '@/features/review/ui/ReviewListDropDown'
import { useAuth } from '@/shared/hook/useAuth'
import { usePopupStore } from '@/shared/store/usePopupStore'
import { AxiosError } from 'axios'

const FILTERS = [
  '최신',
  '인기',
  '내가 작성한',
  '내가 답변한',
  '내가 좋아한',
] as const
type FilterType = (typeof FILTERS)[number]
const SEARCH_CONDITIONS: Record<FilterType, number> = {
  최신: 0,
  인기: 1,
  '내가 작성한': 2,
  '내가 답변한': 3,
  '내가 좋아한': 4,
}

const ReviewListPage = () => {
  const router = useRouter()
  const checkAuth = useAuth()
  const { openPopup } = usePopupStore.getState()
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('최신')
  const [dropdownOpen, setDropdownOpen] = useState(false)

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
  } = useReviewListInfiniteQuery(searchCondition, 5, true)

  const goReviewForm = () => {
    router.push('/review/form')
  }

  const onclickCreateReview = async () => {
    const isLogin = await checkAuth()
    if (!isLogin) {
      openPopup(
        '로그인 후에 리뷰 등록이 가능합니다.',
        '로그인 하시겠습니까?',
        goReviewForm,
      )
      return
    }
    goReviewForm()
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  useEffect(() => {
    if (isError && error && error instanceof AxiosError) {
      if (error.response?.data.errorCode === 'REVIEW010') {
        openPopup('', '로그인 후에 가능합니다. 로그인하시겠습니까?', () =>
          router.push('/user/login?redirect=/'),
        )
        setSelectedFilter('최신')
      }
    }
  }, [isError, error, openPopup, router])

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <button
          onClick={onclickCreateReview}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
        >
          리뷰 작성하기
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
          <ReviewListDropDown
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {data?.pages.map((page) =>
          page.reviewList?.map((review, index) => (
            <ReviewListCard key={index} {...review} />
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

export default ReviewListPage
