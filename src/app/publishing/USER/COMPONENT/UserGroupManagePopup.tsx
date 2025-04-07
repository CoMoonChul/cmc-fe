'use client'

import { useState } from 'react'

const UserGroupManagePopup = () => {
  const [members, setMembers] = useState([
    { id: 1, nickname: 'DevMaster', email: 'dev@codebattle.com' },
    { id: 2, nickname: 'CodeWarrior', email: 'warrior@codebattle.com' },
  ])
  const [nickname, setNickname] = useState('')
  const [showConfirm, setShowConfirm] = useState<{
    id: number
    nickname: string
  } | null>(null)

  const handleRemoveMember = (id: number, nickname: string) => {
    setShowConfirm({ id, nickname })
  }

  const confirmRemoveMember = () => {
    if (showConfirm) {
      setMembers(members.filter((member) => member.id !== showConfirm.id))
      setShowConfirm(null)
    }
  }

  const handleInvite = () => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[500px] bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">그룹 정보</h2>

        <div className="space-y-3 border-t border-gray-300 dark:border-gray-600 pt-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm">
                  {member.nickname.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{member.nickname}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {member.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveMember(member.id, member.nickname)}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {members.length < 5 && (
          <div className="mt-6 flex items-center gap-2">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="초대할 사용자의 닉네임을 입력하세요"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800"
            />
            <button
              onClick={handleInvite}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              초대하기
            </button>
          </div>
        )}

        <div className="mt-4 text-right">
          <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition">
            닫기
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">
              멤버 {showConfirm.nickname}을(를) 내보내시겠습니까?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                취소
              </button>
              <button
                onClick={confirmRemoveMember}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserGroupManagePopup
