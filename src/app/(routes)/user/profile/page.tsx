'use client'

import { useState, useEffect } from 'react'
import { useWithdrawMutation } from '@/features/user/hooks/useWithdrawMutation'
import { useUpdateUserMutation } from '@/features/user/hooks/useUpdateUserMutation'
import { useLogout } from '@/features/user/hooks/useLogout'
import { useGetMyInfoQuery } from '@/features/user/hooks/useGetMyInfoQuery'
import { GROUP, USER } from '#/generate'
import { useRouter } from 'next/navigation'
import { usePopupStore } from '@/shared/store/usePopupStore'
import ConfirmWithdrawalPopup from '@/features/user/ui/ConfirmWithdrawalPopup'
import ProfileImageSelectorModal from '@/features/user/ui/ProfileImageSelectorModal'
import Image from 'next/image'
import { useCreateGroup } from '@/features/group/hooks/useCreateGroup'
import GroupCreateModal from '@/features/group/ui/GroupCreateModal'
import GroupManageModal from '@/features/group/ui/GroupManageModal'
import GroupManageArea from '@/features/group/ui/GroupManageArea'

const UserProfilePage = () => {
  const router = useRouter()
  const withdrawMutation = useWithdrawMutation()
  const updateMutation = useUpdateUserMutation()
  const logoutMutation = useLogout()
  const { data } = useGetMyInfoQuery()
  const { openPopup } = usePopupStore.getState()
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false)
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [editMode, setEditMode] = useState({
    nickname: false,
    email: false,
  })
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openManageModal, setOpenManageModal] = useState(false)

  const [groupId, setGroupId] = useState<number | null>(null)
  const createGroupMutation = useCreateGroup()

  const onClickLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push('/')
      },
    })
  }

  const updateUser = (nickname: string, email: string, profileImg: string) => {
    const req: USER.UpdateReqDTO = {
      username: nickname,
      email: email,
      profileImg: profileImg,
    }

    updateMutation.mutate(req, {
      onError: () => {
        router.refresh()
      },
    })
  }

  const withDraw = (password: string) => {
    // 회원 탈퇴 시 브라우저에 존재하는 토큰을 지워야 하는 이슈가 남아있음
    const req: USER.WithdrawReqDTO = {
      password: password,
    }
    withdrawMutation.mutate(req, {
      onSuccess: () => {
        router.push('/')
      },
    })
  }

  const onClickWithdraw = () => {
    openPopup(
      '',
      '탈퇴 시 작성하신 모든 리뷰, 배틀, 댓글이 삭제되며 복구되지 않습니다.',
      () => setShowWithdrawPopup(true),
    )
  }

  const handleCreateGroup = (groupName: string) => {
    const CreateReq: GROUP.CreateReqDTO = {
      groupName,
    }
    createGroupMutation.mutate(CreateReq)
  }

  useEffect(() => {
    if (data) {
      setNickname(data.username)
      setEmail(data.email)
      setSelectedImage(data.profileImg ?? '')
    }
  }, [data])

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
        <div className="flex flex-col items-center mb-10">
          {selectedImage ? (
            <div className="w-28 h-28 rounded-full overflow-hidden relative border">
              <Image
                src={selectedImage}
                alt="선택한 프로필"
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
          ) : (
            <div className="w-28 h-28 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl text-white">
              프로필
            </div>
          )}
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setShowImageSelector(true)}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              이미지 업로드
            </button>
            <button
              onClick={() => {
                setSelectedImage('')
                updateUser(nickname, email, '')
              }}
              className="text-sm text-red-500 hover:text-red-700"
            >
              이미지 제거
            </button>
          </div>
        </div>
        <div className="w-full space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-sm font-medium">닉네임</p>
            <div className="flex items-center gap-3">
              {editMode.nickname ? (
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="border rounded-md p-2 text-sm w-48 dark:bg-gray-900 dark:border-gray-600"
                />
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {nickname}
                </p>
              )}
              <button
                onClick={() => {
                  setEditMode({ ...editMode, nickname: !editMode.nickname })
                  updateUser(nickname, email, selectedImage)
                }}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                {editMode.nickname ? '저장' : '수정'}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-sm font-medium">이메일</p>
            <div className="flex items-center gap-3">
              {editMode.email ? (
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-md p-2 text-sm w-48 dark:bg-gray-900 dark:border-gray-600"
                />
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {email}
                </p>
              )}
              <button
                onClick={() => {
                  setEditMode({ ...editMode, email: !editMode.email })
                  updateUser(nickname, email, selectedImage)
                }}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                {editMode.email ? '저장' : '수정'}
              </button>
            </div>
          </div>
        </div>
        {/* 그룹 관리 영역 */}
        <GroupManageArea
          setOpenCreateModal={setOpenCreateModal}
          setOpenManageModal={setOpenManageModal}
          setGroupId={setGroupId}
        />
        <div className="w-full flex flex-col items-center mt-10 gap-2">
          <button
            onClick={onClickLogout}
            className="w-32 p-2 rounded-md border text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-900 text-sm"
          >
            로그아웃
          </button>
          <button
            onClick={onClickWithdraw}
            className="text-red-500 hover:underline text-sm"
          >
            회원 탈퇴
          </button>
        </div>
        {showWithdrawPopup && (
          <ConfirmWithdrawalPopup
            onCancel={() => setShowWithdrawPopup(false)}
            onConfirm={(password) => {
              withDraw(password)
              setShowWithdrawPopup(false)
            }}
          />
        )}
        {showImageSelector && (
          <ProfileImageSelectorModal
            onClose={() => setShowImageSelector(false)}
            onSelect={(url) => {
              setSelectedImage(url)
              setShowImageSelector(false)
              updateUser(nickname, email, url)
            }}
          />
        )}
        {openCreateModal && (
          <GroupCreateModal
            onClose={() => setOpenCreateModal(false)}
            onSave={handleCreateGroup}
          />
        )}
        {openManageModal && (
          <GroupManageModal
            groupId={groupId}
            onClose={() => setOpenManageModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default UserProfilePage
