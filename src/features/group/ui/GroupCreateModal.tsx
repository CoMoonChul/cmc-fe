'use client'

import { useEffect, useState } from 'react'

interface GroupCreateModalProps {
  onClose: () => void
  onSave: (groupName: string) => void
}

const GroupCreateModal = ({ onClose, onSave }: GroupCreateModalProps) => {
  const [groupName, setGroupName] = useState('')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[80vw] h-[10vh] shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-lg font-bold">그룹 만들기</h2>
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 border-gray-300"
            placeholder="그룹명은 최대 10자까지 작성해주세요"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onSave(groupName)
                onClose()
              }
            }}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => {
              onSave(groupName)
              onClose()
            }}
          >
            만들기
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupCreateModal
