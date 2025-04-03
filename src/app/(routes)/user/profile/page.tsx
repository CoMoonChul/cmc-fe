'use client'

import { useState, useEffect } from 'react'
import { useWithdrawMutation } from '@/features/user/hooks/useWithdrawMutation'
import { useUpdateUserMutation } from '@/features/user/hooks/useUpdateUserMutation'
import { useLogout } from '@/features/user/hooks/useLogout'
import { useGetMyInfoQuery } from '@/features/user/hooks/useGetMyInfoQuery'
import { USER } from '#/generate'
import { useRouter } from 'next/navigation'
import { usePopupStore } from '@/shared/store/usePopupStore'
import ConfirmWithdrawalPopup from '@/features/user/ui/ConfirmWithdrawalPopup'
import ProfileImageSelectorModal from '@/features/user/ui/ProfileImageSelectorModal'
import Image from 'next/image'

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

  useEffect(() => {
    if (data) {
      setNickname(data.username)
      setEmail(data.email)
      setSelectedImage(data.profileImg ?? '')
    }
  }, [data])

  return (
    <div className="min-h-screen flex flex-col items-start justify-start bg-white dark:bg-black text-black dark:text-white p-6">
      <div className="grid grid-cols-[1fr_2fr] gap-10 w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-start">
          {selectedImage ? (
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 relative border-2 border-gray-300 dark:border-gray-600">
              <Image
                src={selectedImage}
                alt="선택한 프로필"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
          ) : (
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center text-xl text-white">
              프로필
            </div>
          )}
          <div className="flex gap-4">
            <button
              className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
              onClick={() => setShowImageSelector(true)}
            >
              이미지 선택
            </button>
            <button
              onClick={() => {
                setSelectedImage('')
                updateUser(nickname, email, '')
              }}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
            >
              이미지 제거
            </button>
          </div>

          <div className="mt-6 w-full">
            <p className="font-medium">나의 그룹</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              그룹을 만들어 회의에 초대하거나 게시물을 공유해보세요.
            </p>
            <button className="mt-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition">
              그룹 만들기
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="mb-6">
            <p className="text-lg font-medium">닉네임</p>
            <div className="flex items-center gap-4">
              {editMode.nickname ? (
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-48 p-2 border rounded-md bg-white dark:bg-gray-900 dark:border-gray-600 border-gray-300 text-black dark:text-white"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{nickname}</p>
              )}
              <button
                onClick={() => {
                  setEditMode({ ...editMode, nickname: !editMode.nickname })
                  updateUser(nickname, email, selectedImage)
                }}
                className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
              >
                {editMode.nickname ? '저장' : '수정'}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg font-medium">이메일</p>
            <div className="flex items-center gap-4">
              {editMode.email ? (
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-48 p-2 border rounded-md bg-white dark:bg-gray-900 dark:border-gray-600 border-gray-300 text-black dark:text-white"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{email}</p>
              )}
              <button
                onClick={() => {
                  setEditMode({ ...editMode, email: !editMode.email })
                  updateUser(nickname, email, selectedImage)
                }}
                className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
              >
                {editMode.nickname ? '저장' : '수정'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 w-full max-w-4xl mx-auto flex flex-col items-start gap-2">
        <button
          onClick={onClickLogout}
          className="w-32 p-2 rounded-md text-red-600 dark:text-red-400 border border-red-400 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition active:opacity-80 text-sm"
        >
          로그아웃
        </button>

        <button
          onClick={onClickWithdraw}
          className="text-red-600 dark:text-red-400 underline hover:text-red-700 dark:hover:text-red-300 transition text-sm"
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
    </div>
  )
}

export default UserProfilePage
