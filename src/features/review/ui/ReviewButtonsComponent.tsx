'use client'

import { REVIEW } from '#/generate'
import { usePopupStore } from '@/shared/store/usePopupStore'
import useUserStore from '@/shared/store/useUserStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDeleteReviewMutation } from '../hooks/useDeleteReviewMutation'

const ReviewButtonsComponent = ({
  reviewId,
  userNum,
}: {
  reviewId: number
  userNum: number
}) => {
  const { user } = useUserStore()
  const router = useRouter()
  const deleteReviewMutation = useDeleteReviewMutation(reviewId)
  const { openPopup } = usePopupStore.getState()
  const [isDeleting, setIsDeleting] = useState(false)
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

  // 팝업에서 확인 버튼 클릭
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

  // 작성자가 아닌 경우 버튼 숨기기
  if (userNum !== authUserNum) {
    return <></>
  }

  return (
    <div className="flex space-x-4">
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
