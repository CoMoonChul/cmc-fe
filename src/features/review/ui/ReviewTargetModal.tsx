'use client'

import { useEffect, useState } from 'react'

// const dummyGroupList = ['FE 개발자', 'BE 마스터', '리액트 장인', '코드 리뷰어']
const dummyGroupList: string[] = []
const dummyUserSearchResult = ['박종일', '임현우', '고영성']

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (groups: string[]) => void
  isEdit: boolean
}

export default function ReviewTargetModal({
  open,
  onClose,
  onSubmit,
  isEdit = false,
}: Props) {
  const [nickname, setNickname] = useState('')
  const [addedUsers, setAddedUsers] = useState<string[]>([])
  const [activeGroups, setActiveGroups] = useState<string[]>([])
  const [nicknameError, setNicknameError] = useState('')

  const handleAddUser = () => {
    if (!dummyUserSearchResult.includes(nickname)) {
      setNicknameError('존재하지 않는 닉네임이에요')
      return
    }
    if (!addedUsers.includes(nickname)) {
      setAddedUsers([...addedUsers, nickname])
      setNickname('')
      setNicknameError('')
    }
  }

  const handleRemoveUser = (user: string) => {
    setAddedUsers(addedUsers.filter((u) => u !== user))
  }

  const toggleGroup = (group: string) => {
    setActiveGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
    )
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-[80vw] h-auto max-w-2xl shadow-lg flex flex-col text-black dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            리뷰 {isEdit ? '수정' : '등록'} 설정
          </h2>
          <button
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          빠르게 리뷰를 받고 싶다면 알림을 발송해 보세요!
        </p>
        <div className="mb-6">
          <span className="text-sm font-medium mb-1 block">그룹 선택</span>
          <div className="flex flex-wrap gap-2">
            {dummyGroupList.length > 0 ? (
              dummyGroupList.map((group) => (
                <button
                  key={group}
                  onClick={() => toggleGroup(group)}
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    activeGroups.includes(group)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {group}
                </button>
              ))
            ) : (
              <div>없음</div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600"
          >
            취소
          </button>
          <button
            onClick={() => onSubmit(activeGroups)}
            className="px-4 py-2 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600"
          >
            {isEdit ? '수정하기' : '등록하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
