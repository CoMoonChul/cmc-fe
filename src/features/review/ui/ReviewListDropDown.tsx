'use client'
import { useAuth } from '@/shared/hook/useAuth'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { usePopupStore } from '@/shared/store/usePopupStore'

const FILTERS = [
  '최신',
  '인기',
  '내가 작성한',
  '내가 답변한',
  '내가 좋아한',
] as const
type FilterType = (typeof FILTERS)[number]

interface ReviewListDropDownProps {
  selectedFilter: FilterType
  setSelectedFilter: Dispatch<SetStateAction<FilterType>>
  dropdownOpen: boolean
  setDropdownOpen: Dispatch<SetStateAction<boolean>>
}

const ReviewListDropDown = ({
  selectedFilter,
  setSelectedFilter,
  dropdownOpen,
  setDropdownOpen,
}: ReviewListDropDownProps) => {
  const router = useRouter()
  const checkAuth = useAuth()
  const { openPopup } = usePopupStore.getState()

  const toggleDropdown = async () => {
    const isLogin = await checkAuth()
    if (!isLogin) {
      openPopup('로그인 후에 My 필터를 사용 할 수 있습니다.', '', goToLogin)
      return
    }
    setDropdownOpen((prev) => !prev)
  }

  const goToLogin = () => {
    router.push('/user/login?redirect=/')
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      >
        {selectedFilter === '내가 작성한' ||
        selectedFilter === '내가 답변한' ||
        selectedFilter === '내가 좋아한'
          ? selectedFilter
          : 'My ▼'}
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
          {FILTERS.slice(2, 5).map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter)
                setDropdownOpen(false)
              }}
              className={`block w-full text-left px-4 py-2 text-sm ${
                selectedFilter === filter
                  ? 'bg-gray-100 dark:bg-gray-700 font-bold'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewListDropDown
