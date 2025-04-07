'use client'

import { Dispatch, SetStateAction } from 'react'
import { useAuth } from '@/shared/hook/useAuth'
import { usePopupStore } from '@/shared/store/usePopupStore'
import { useRouter } from 'next/navigation'

const FILTERS = ['최신', '인기', '내가 작성한', '내가 참여한'] as const
type FilterType = (typeof FILTERS)[number]

interface BattleListDropDownProps {
  selectedFilter: FilterType
  setSelectedFilter: Dispatch<SetStateAction<FilterType>>
  dropdownOpen: boolean
  setDropdownOpen: Dispatch<SetStateAction<boolean>>
}

const BattleListDropDown = ({
  selectedFilter,
  setSelectedFilter,
  dropdownOpen,
  setDropdownOpen,
}: BattleListDropDownProps) => {
  const router = useRouter()
  const checkAuth = useAuth()
  const { openPopup } = usePopupStore.getState()

  const toggleDropdown = async () => {
    const result = await checkAuth()
    if (!result) {
      openPopup('로그인 후에 가능합니다.', '로그인 하시겠습니까?', goLogin)
      return
    }
    setDropdownOpen((prev) => !prev)
  }

  const goLogin = () => {
    router.push('/user/login?redirect=/battle')
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      >
        {selectedFilter === '내가 작성한' || selectedFilter === '내가 참여한'
          ? selectedFilter
          : 'My ▼'}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
          {FILTERS.slice(2, 4).map((filter) => (
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

export default BattleListDropDown
