'use client'

import { useEffect, useState } from 'react'

interface GroupManageModalProps {
  onClose: () => void
  onSave: () => void
}

const GroupManageModal = ({ onClose, onSave }: GroupManageModalProps) => {
  const [groupName, setGroupName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [members, setMembers] = useState([
    { id: 1, nickname: 'DevMaster', email: 'dev@codebattle.com' },
    { id: 2, nickname: 'CodeWarrior', email: 'warrior@codebattle.com' },
  ])
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleRemoveMember = (id: number, nickname: string) => {
    // setShowConfirm({ id, nickname })
    console.log('내보내기 ㅋ', id)
  }
  const handleInvite = () => {
    console.log('닉네임 ㅋ', nickname)
    if (!nickname.trim()) return
    const isExisting = members.some((member) => member.nickname === nickname)
    if (isExisting) {
      alert('이미 그룹에 속한 멤버입니다.')
      return
    }
    setMembers([
      ...members,
      { id: Date.now(), nickname, email: `${nickname}@codebattle.com` },
    ])
    setNickname('')
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[80vw] h-[10vh] shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 그룹 정보 */}
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-lg font-bold">그룹 정보</h2>
        </div>

        {/* 멤버 리스트 */}
        <div className="space-y-3 border-t border-gray-300 dark:border-gray-600 pt-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-md"
            >
              <div className="flex items-center gap-4">
                {/* 멤버 이미지 */}
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm">
                  {member.nickname.charAt(0).toUpperCase()}
                </div>
                {/* 멤버 정보 */}
                <div>
                  <p className="font-medium">{member.nickname}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {member.email}
                  </p>
                </div>
              </div>
              {/* 멤버 내보내기 버튼 */}
              <button
                onClick={() => handleRemoveMember(member.id, member.nickname)}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className={`w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="초대할 사용자의 닉네임을 입력하세요"
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
            onClick={handleInvite}
          >
            초대하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupManageModal
