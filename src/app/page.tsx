'use client'
import { useReviewListInfiniteQuery } from '@/features/review/hooks/useReviewListInfiniteQuery'
import ReviewListCard from '@/features/review/ui/ReviewListCard'
import { useEffect, useState, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'
import { filter } from 'lodash'
import ReviewListDropDown from '@/features/review/ui/ReviewListDropDown'
import { useAuth } from '@/shared/hook/useAuth'
import { usePopupStore } from '@/shared/store/usePopupStore'

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

  const searchCondition = useMemo(
    () => SEARCH_CONDITIONS[selectedFilter],
    [selectedFilter],
  )
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReviewListInfiniteQuery(searchCondition, 5, true)

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

  const [myFilter, setMyFilter] = useState<string | null>(null)
  const [showMyDropdown, setShowMyDropdown] = useState(false)

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onclickCreateReview}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          리뷰 작성하기
        </button>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg dark:border-gray-600 overflow-visible">
          {/* 최신순, 인기순 */}
          {FILTERS.slice(0, 2).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 ${
                selectedFilter === filter
                  ? 'bg-gray-200 dark:hover:bg-gray-700'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
          {/* My 드롭다운 */}
          <ReviewListDropDown
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>
      </div>

      {/* 리뷰 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
