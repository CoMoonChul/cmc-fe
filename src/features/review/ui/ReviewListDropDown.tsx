'use client'
import { useAuth } from '@/shared/hook/useAuth'
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { usePopupStore } from '@/shared/store/usePopupStore'

const FILTERS = [
  '최신',
  '인기',
  '내가 작성한',
  '내가 답변한',
  '내가 좋아한',
] as const //리터럴 타입으로 추론하도록
type FilterType = (typeof FILTERS)[number]

interface ReviewListDropDownProps {
  selectedFilter: FilterType
  setSelectedFilter: Dispatch<SetStateAction<FilterType>>
}

const ReviewListDropDown = ({
  selectedFilter,
  setSelectedFilter,
}: ReviewListDropDownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const pathName = usePathname()
  const checkAuth = useAuth()
  const { openPopup } = usePopupStore.getState()

  const goToLogin = () => {
    router.push(`/user/login?redirect=${pathName}`)
  }

  const toggleDropdown = async () => {
    const isLogin = await checkAuth()
    if (!isLogin) {
      openPopup('로그인 후에 My 필터를 사용 할 수 있습니다.', '', goToLogin)
      return
    }
    setDropdownOpen((prev) => !prev)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        My ▼
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {FILTERS.slice(2, 5).map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter)
                setDropdownOpen(false)
              }}
              className={`block w-full text-left px-4 py-2 ${
                selectedFilter === filter
                  ? 'bg-gray-100 dark:hover:bg-gray-700'
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
