import { selectReview } from '@/entities/review/api'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import LikeComponent from '@/features/like/ui/LikeComponent'
// import ReviewCodeArea from '@/features/review/ui/ReviewCodeArea'
import { getFormattedCreatedAt } from '@/shared/lib/date'
import CommentSection from '@/features/comment/ui/CommentSection'
import { COMMENT_TARGET } from '@/features/comment/types'
import useUserStore from '@/shared/store/useUserStore'

interface ReviewDetailPageProps {
  params: Promise<{ id: string }>
}

const ReviewDetailPage: FC<ReviewDetailPageProps> = async ({ params }) => {
  const { id } = await params
  if (Number.isNaN(Number(id))) {
    notFound()
  }

  const {
    reviewId,
    title,
    username,
    content,
    codeContent,
    viewCount,
    likeCount,
    createdAt,
    updatedAt,
  } = await selectReview(Number(id))

  if (!reviewId) {
    throw new Error('리뷰 조회에 실패했습니다!!')
  }

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      {/* 리뷰 제목 */}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {/* 작성 정보 & 부가 정보 */}
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center space-x-2">
          <img
            src="/profile-placeholder.png"
            alt="작성자"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{username}</span>
          <span>|</span>
          <span>{createdAt && getFormattedCreatedAt(createdAt)}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span>👁 {viewCount ?? 1}</span>
          </div>
          <LikeComponent reviewId={reviewId} />
          <button className="text-blue-500">🔗 공유</button>
          <button className="text-green-500">✏ 수정하기</button>
          <button className="text-red-500">❌ 삭제하기</button>
        </div>
      </div>

      {/* 리뷰 내용 */}
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-gray-700 dark:text-gray-300 mb-4">
        {content}
      </div>

      {/* 코드 에디터 */}
      <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg overflow-hidden">
        {/* <ReviewCodeArea/> */}
      </div>

      {/* 댓글 영역 */}
      <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <CommentSection id={reviewId} commentTarget={COMMENT_TARGET.REVIEW} />
      </div>
    </div>
  )
}

export default ReviewDetailPage
