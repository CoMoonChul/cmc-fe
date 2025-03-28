'use client'

import { useEffect, useState } from 'react'

const dummyGroupList = ['FE 개발자', 'BE 마스터', '리액트 장인', '코드 리뷰어']
const dummyUserSearchResult = ['박종일', '임현우', '고영성']

export default function ReviewMetaModal({
  open,
  onClose,
  isEdit = false,
}: {
  open: boolean
  onClose: () => void
  isEdit?: boolean
}) {
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

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">닉네임 검색</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임 검색"
              className="flex-1 px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              onClick={handleAddUser}
              className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600"
            >
              추가
            </button>
          </div>
          {nicknameError && (
            <p className="mt-1 text-sm text-red-500 text-xs">{nicknameError}</p>
          )}
        </div>
        {addedUsers.length > 0 && (
          <div className="mb-4">
            <span className="text-sm font-medium mb-1 block">
              추가된 사용자
            </span>
            <div className="flex flex-wrap gap-2">
              {addedUsers.map((user) => (
                <div
                  key={user}
                  className="flex items-center bg-gray-200 dark:bg-neutral-800 px-3 py-1 rounded-full text-sm"
                >
                  {user}
                  <button
                    onClick={() => handleRemoveUser(user)}
                    className="ml-2 text-gray-600 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <span className="text-sm font-medium mb-1 block">그룹 선택</span>
          <div className="flex flex-wrap gap-2">
            {dummyGroupList.map((group) => (
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
            ))}
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
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600"
          >
            {isEdit ? '수정하기' : '등록하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
