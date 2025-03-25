'use client'
import { useReviewListInfiniteQuery } from '@/features/review/hooks/useReviewListInfiniteQuery'
import ReviewListCard from '@/features/review/ui/ReviewListCard'
import { useEffect, useState, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'

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
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('최신')
  const searchCondition = useMemo(
    () => SEARCH_CONDITIONS[selectedFilter],
    [selectedFilter],
  )
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReviewListInfiniteQuery(searchCondition, 5, true)

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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          리뷰 작성하기
        </button>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg dark:border-gray-600 overflow-visible">
          <button className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            최신
          </button>
          <button className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            인기
          </button>
          {/* My 드롭다운 */}
          <div className="relative">
            <button
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setShowMyDropdown(!showMyDropdown)}
            >
              My ▼
            </button>
            {showMyDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMyFilter('작성한')}
                >
                  내가 작성한
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMyFilter('답변한')}
                >
                  내가 답변한
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMyFilter('좋아요')}
                >
                  내가 좋아한
                </button>
              </div>
            )}
          </div>
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
    </div>
  )
}

export default ReviewListPage
