'use client'
import { useState } from 'react'

const BattleListDropDown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
      >
        My ▼
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            내가 작성한
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            내가 참여한
          </button>
        </div>
      )}
    </div>
  )
}

export default BattleListDropDown
