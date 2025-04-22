'use client'

import { LIVECODING, REVIEW } from '#/generate'
import { usePopupStore } from '@/shared/store/usePopupStore'
import useUserStore from '@/shared/store/useUserStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDeleteReviewMutation } from '../hooks/useDeleteReviewMutation'
import { createLiveCoding } from '@/entities/livecoding/api'
import { useCreateLiveCodingRoomMutation } from '@/features/livecoding/hooks/useCreateLiveCodingRoomMutation'

const ReviewButtonsComponent = ({
  reviewId,
  userNum,
  code,
  language,
}: {
  reviewId: number
  userNum: number
  code: string
  language: string
}) => {
  const { user } = useUserStore()
  const router = useRouter()
  const deleteReviewMutation = useDeleteReviewMutation(reviewId)
  const useCreateLiveCodingRoomMutaion = useCreateLiveCodingRoomMutation()
  const { openPopup } = usePopupStore.getState()
  const [isDeleting, setIsDeleting] = useState(false)
  const [roomId, setRoomId] = useState<string | null>(null)
  const authUserNum = user.userNum

  // 수정 버튼 클릭 핸들러
  const handleEdit = () => {
    router.push(`/review/form/${reviewId}`) // 수정 페이지로 이동
  }

  // 삭제 버튼 클릭
  const onClickDeleteBtn = () => {
    openPopup(
      '리뷰 삭제',
      '정말로 이 리뷰를 삭제하시겠습니까?',
      () => onConfirmDelete(), // 확인 버튼 클릭 시 호출될 함수
    )
  }
  // 라이브 코딩 생성 버튼
  const onClickCreateLiveCodingRoom = () => {
    openPopup(
      '라이브 코딩 방 생성 ',
      '라이브 코딩을 시작할까요?',
      () => onConfirmCreateRoom(), // 확인 버튼 클릭 시 호출될 함수
    )
  }
  // 삭제 확인 버튼 클릭
  const onConfirmDelete = () => {
    setIsDeleting(true) // 로딩 상태 활성화
    const req: REVIEW.DeleteReviewReqDTO = {
      reviewId: reviewId,
    }
    deleteReviewMutation.mutate(req, {
      onSuccess: () => {
        setIsDeleting(false) // 로딩 상태 비활성화
        router.push('/') // 리뷰 리스트로 이동
      },
      onError: () => {
        setIsDeleting(false) // 에러 발생 시 로딩 상태 비활성화
      },
    })
  }
  // 라이브 코딩 확인 버튼 클릭
  const onConfirmCreateRoom = async () => {
    if (!userNum) throw new Error('호스트ID 정보가 유효하지 않습니다.')
    if (!code) throw new Error('기술 된 코드가 없습니다.')
    if (!language?.trim())
      throw new Error('프로그래밍 언어가 올바르지 않습니다.')

    try {
      const result = await useCreateLiveCodingRoomMutaion.mutateAsync({
        hostId: Number(userNum),
        code,
        language,
      })

      // ✅ 성공 시 URL 이동
      router.push(`/livecoding/${result.roomId}`)
    } catch (error) {
      console.error('방 생성 실패:', error)
      throw new Error('방 생성 실패. 잠시 후 다시 시도해 주세요.')
    }
  }

  // 작성자가 아닌 경우 버튼 숨기기
  if (userNum !== authUserNum) {
    return <></>
  }

  return (
    <div className="flex space-x-4">
      {/* 방 생성 버튼 */}
      <button onClick={onClickCreateLiveCodingRoom} className="text-blue-500">
        라이브코딩 방 생성
      </button>
      <button onClick={handleEdit} className="text-green-500">
        ✏ 수정하기
      </button>
      <button
        onClick={onClickDeleteBtn}
        className="text-red-500"
        disabled={isDeleting}
      >
        {isDeleting ? '삭제 중...' : '❌ 삭제하기'}
      </button>
    </div>
  )
}
export default ReviewButtonsComponent
