'use client'

import { usePopupStore } from '@/shared/store/usePopupStore'
import useUserStore from '@/shared/store/useUserStore'
import { LIVECODING } from '#/generate'
import { createLiveCoding } from '@/entities/livecoding/api'
import { useRouter } from 'next/navigation'

const StartLiveButton = () => {
  const { openPopup } = usePopupStore.getState()
  const { user } = useUserStore()
  const router = useRouter()

  const startLive = async () => {
    try {
      const req: LIVECODING.CreateLiveCodingReqDTO = {
        hostId: Number(user?.userNum),
      }
      const response = await createLiveCoding(req)
      router.push(`/livecoding/${response.roomId}`)
    } catch (error) {
      openPopup(
        '실시간 코드 리뷰 회의 시작에 실패하였습니다. 잠시 후 다시 시도해 주세요.',
        '',
      )
      console.error('방 생성 실패:', error)
    }
  }

  const onClickStartLive = () => {
    openPopup(
      '실시간 코드 리뷰 회의를 시작할 수 있습니다.',
      '시작 하시겠습니까?',
      startLive,
    )
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClickStartLive}
    >
      코드 리뷰 시작
    </button>
  )
}

export default StartLiveButton
