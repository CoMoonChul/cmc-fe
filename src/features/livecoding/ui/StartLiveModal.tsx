'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/shared/hook/useAuth'
import { usePopupStore } from '@/shared/store/usePopupStore'
import { useRouter } from 'next/navigation'
import useUserStore from '@/shared/store/useUserStore'
import { LIVECODING } from '#/generate'
import { createLiveCoding } from '@/entities/livecoding/api'

interface StartLiveModalProps {
  onClose: () => void
}

const StartLiveModal = ({ onClose }: StartLiveModalProps) => {
  const [inviteCode, setInviteCode] = useState('')
  const checkAuth = useAuth()
  const router = useRouter()
  const { openPopup } = usePopupStore.getState()
  const { user } = useUserStore()

  const goLogin = () => {
    router.push('/user/login')
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const onClickCreateRoom = async () => {
    onClose()
    const isLogin = await checkAuth()
    if (!isLogin) {
      openPopup(
        '로그인 후에 실시간 코드 리뷰 회의를 시작할 수 있습니다.',
        '로그인 하시겠습니까?',
        goLogin,
      )
      return
    }
    const req: LIVECODING.CreateLiveCodingReqDTO = {
      hostId: Number(user?.userNum),
    }
    const response = await createLiveCoding(req)
    router.push(`/livecoding/${response.roomId}`)
  }

  const onClickJoin = (inviteUrl: string) => {
    if (!inviteCode.trim()) {
      openPopup('초대 코드를 입력해주세요.', '')
      return
    }

    const url = new URL(inviteUrl)
    const queryString = url.search.slice(1)

    if (!queryString.startsWith('token=')) {
      openPopup(
        '초대 코드 형식이 잘못되었습니다. token 파라미터가 필요합니다.',
        '',
      )
      return
    }

    // validation api가 따로 있는지 몰라서 일단 예시 붙여둠.
    // 0. 존재하는 방이 맞는지 등
    // 1. 방 정원이 다 찼는지
    // 2. 이미 들어온 사용자의 요청인지(이미 들어온 사용자의 요청이나, 기존 연결 세션으로 붙여질 수 있는 구조면 validation 성공으로 처리해도 될듯)
    // await validateLiveCodingToken(queryString)

    // 검증 성공 시 링크로 이동
    router.push(inviteUrl)
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[90vw] max-w-xl shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          실시간 공유를 시작합니다
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          초대 코드를 받았다면 코드를 입력해주세요.
        </p>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="초대 코드 입력"
            className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 border-gray-300"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => onClickJoin(inviteCode)}
          >
            접속
          </button>
        </div>

        <div className="mt-2 text-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={onClickCreateRoom}
          >
            방 생성하기
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            className="text-sm text-gray-500 hover:underline"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default StartLiveModal
