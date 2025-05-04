'use client'

import { useState, useEffect } from 'react'
import useUserStore from '@/shared/store/useUserStore'
import { withdrawNext } from '@/entities/user/api'
import { useUpdateUserMutation } from '@/features/user/hooks/useUpdateUserMutation'
import { useLogoutMutation } from '@/features/user/hooks/useLogoutMutation'
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
  const updateMutation = useUpdateUserMutation()
  const logoutMutation = useLogoutMutation()
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
        // Zustand 상태 초기화
        useUserStore.getState().clearUser()
        // 로컬스토리지 데이터 제거
        localStorage.removeItem('user-store')

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

  const withDraw = async (password: string) => {
    const resWithdraw = await withdrawNext(password)
    if (resWithdraw?.status === 200) {
      router.replace('/')
    } else {
      if (resWithdraw?.message && typeof resWithdraw?.message === 'string') {
        console.error('resWithdraw', resWithdraw)
      } else {
        console.error('resWithdraw', resWithdraw)
      }
    }
  }

  const onClickWithdraw = () => {
    openPopup(
      '',
      '탈퇴 시 작성하신 모든 리뷰, 배틀, 댓글이 삭제되며 복구되지 않습니다.',
      () => {
        if (data?.userId?.startsWith('google_')) {
          withDraw('') // 구글 회원은 비밀번호 입력 없이 탈퇴 처리
        } else {
          setShowWithdrawPopup(true) // 일반 사용자는 비밀번호 입력 후 탈퇴 처리
        }
      },
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
              이미지 선택
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
                  if (editMode.nickname) {
                    updateUser(nickname, email, selectedImage)
                  }
                  setEditMode((prev) => ({ ...prev, nickname: !prev.nickname }))
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
              {data?.email && !data?.userId?.startsWith('google_') && (
                <button
                  onClick={() => {
                    if (editMode.email) {
                      updateUser(nickname, email, selectedImage)
                    }
                    setEditMode((prev) => ({ ...prev, email: !prev.email }))
                  }}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  {editMode.email ? '저장' : '수정'}
                </button>
              )}
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
