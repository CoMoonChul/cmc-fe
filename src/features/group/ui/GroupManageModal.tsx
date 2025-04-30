'use client'

import { useState } from 'react'
import { useGetGroupMemberList } from '@/features/group/hooks/useGroupMemeberList'
import { GROUP } from '#/generate'
import { useInviteGroupMutation } from '@/features/group/hooks/useInviteGroupMutation'
import { useExpelGroupMutation } from '@/features/group/hooks/useExpelGroupMutation'
import { usePopupStore } from '@/shared/store/usePopupStore'
import { AxiosError } from 'axios'
import { getErrorMessage } from '@/shared/lib/messages'

interface GroupManageModalProps {
  groupId: number | null
  onClose: () => void
}

const GroupManageModal = ({ groupId, onClose }: GroupManageModalProps) => {
  const [username, setUsername] = useState('')
  const { data: memberData } = useGetGroupMemberList(groupId ?? 0, {
    enabled: groupId !== null,
  })
  const InviteGroupMutation = useInviteGroupMutation(true)
  const expelMutation = useExpelGroupMutation()
  const { openPopup } = usePopupStore.getState()

  const handleRemoveMember = (userNum?: number) => {
    const ExpelReq: GROUP.ExpelReqDTO = {
      userNum: userNum!,
      groupId: groupId!,
    }
    expelMutation.mutate(ExpelReq)
  }
  const handleInvite = () => {
    if (!username.trim()) return

    const InviteReq: GROUP.InviteReqDTO = {
      username: username!,
      groupId: groupId!,
    }

    InviteGroupMutation.mutate(InviteReq, {
      onSuccess: () => {
        setUsername('')
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const parsedMessage = getErrorMessage(error?.response?.data?.message)
          openPopup('', parsedMessage)
        }
      },
    })
  }

  if (!memberData?.members) {
    return <></>
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
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-lg font-bold">그룹 정보</h2>
        </div>

        <div className="space-y-3 border-t border-gray-300 dark:border-gray-600 pt-4 max-h-60 overflow-y-auto">
          {memberData.members.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              그룹에 멤버가 없습니다.
            </p>
          ) : (
            memberData.members.map((member) => (
              <div
                key={member.userNum}
                className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded"
              >
                <div>
                  <p className="text-sm font-semibold">{member.username}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
                {member.groupRole === 'SLAVE' && (
                  <button
                    className="text-red-500 text-sm hover:underline"
                    onClick={() => handleRemoveMember(member.userNum)}
                  >
                    내보내기
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {memberData.members.length < 5 ? (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 border-gray-300"
              placeholder="초대할 사용자의 닉네임을 입력하세요"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleInvite()
                }
              }}
            />
          </div>
        ) : (
          <></>
        )}

        <div className="mt-4 flex justify-center">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            취소
          </button>
          {memberData.members.length < 5 ? (
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={handleInvite}
            >
              초대하기
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default GroupManageModal
