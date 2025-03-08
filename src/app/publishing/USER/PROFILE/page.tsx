'use client'

import { useState } from 'react'

const UserProfilePage = () => {
  const [nickname, setNickname] = useState('닉네임')
  const [email, setEmail] = useState('user@cmc.kr')
  const [editMode, setEditMode] = useState<{
    nickname: boolean
    email: boolean
  }>({
    nickname: false,
    email: false,
  })
  const [toggles, setToggles] = useState({
    emailNotifications: false,
    alertNotifications: false,
    realTimeInvite: false,
    darkMode: false,
  })
  const [showDeletePopup, setShowDeletePopup] = useState(false)

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles({ ...toggles, [key]: !toggles[key] })
  }

  return (
    <div className="min-h-screen flex flex-col items-start justify-start bg-gray-50 dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-300 p-6">
      {/* 전체 레이아웃 - 좌우 배치 */}
      <div className="grid grid-cols-[1fr_2fr] gap-10 w-full max-w-4xl mx-auto">
        {/* 왼쪽 영역 */}
        <div className="flex flex-col items-start">
          {/* 프로필 이미지 */}
          <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center text-xl">
            프로필
          </div>

          {/* 이미지 선택 & 제거 */}
          <div className="flex gap-4">
            <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition">
              이미지 선택
            </button>
            <button
              onClick={() => alert('이미지가 제거되었습니다.')}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
            >
              이미지 제거
            </button>
          </div>

          {/* 그룹 관리 */}
          <div className="mt-6 w-full">
            <p className="font-medium">나의 그룹</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              그룹을 만들어 회의에 초대하거나 게시물을 공유해보세요.
            </p>
            <button className="mt-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
              그룹 만들기
            </button>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex flex-col w-full">
          {/* 닉네임 변경 */}
          <div className="mb-6">
            <p className="text-lg font-medium">닉네임</p>
            <div className="flex items-center gap-4">
              {editMode.nickname ? (
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-48 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 border-gray-300"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{nickname}</p>
              )}
              <button
                onClick={() =>
                  setEditMode({ ...editMode, nickname: !editMode.nickname })
                }
                className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
              >
                {editMode.nickname ? '저장' : '수정'}
              </button>
            </div>
          </div>

          {/* 이메일 변경 */}
          <div className="mb-6">
            <p className="text-lg font-medium">이메일</p>
            <div className="flex items-center gap-4">
              <p className="text-gray-600 dark:text-gray-400">{email}</p>
              <button
                onClick={() =>
                  setEditMode({ ...editMode, email: !editMode.email })
                }
                className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
              >
                변경
              </button>
            </div>
          </div>

          {/* 알림 및 테마 설정 */}
          <div className="space-y-4">
            {[
              { label: '이메일 수신 설정', key: 'emailNotifications' },
              { label: '알림 수신', key: 'alertNotifications' },
              { label: '실시간 공유 초대', key: 'realTimeInvite' },
              { label: '다크 모드', key: 'darkMode' },
            ].map(({ label, key }) => (
              <div key={key} className="flex justify-between items-center">
                <p>{label}</p>
                <button
                  onClick={() => handleToggle(key as keyof typeof toggles)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                    toggles[key as keyof typeof toggles]
                      ? 'bg-blue-500'
                      : 'bg-gray-400'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                      toggles[key as keyof typeof toggles]
                        ? 'translate-x-6'
                        : ''
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 회원 탈퇴 */}
      <div className="mt-12 w-full max-w-4xl mx-auto">
        <button
          onClick={() => setShowDeletePopup(true)}
          className="w-40 p-3 rounded-md text-red-600 dark:text-red-400 border border-red-400 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition active:opacity-80"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  )
}

export default UserProfilePage
