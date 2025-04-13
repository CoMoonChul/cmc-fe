import { selectReview } from '@/entities/review/api'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import LikeComponent from '@/features/like/ui/LikeComponent'
import ReviewCodeArea from '@/features/review/ui/ReviewCodeArea'
import { getFormattedCreatedAt } from '@/shared/lib/date'
import CommentSection from '@/features/comment/ui/CommentSection'
import { COMMENT_TARGET } from '@/features/comment/types'
import ReviewButtonsComponent from '@/features/review/ui/ReviewButtonsComponent'
import Link from 'next/link'
import Image from 'next/image'
import { decompressGzip } from '@/features/editor/helper'

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
    userNum,
    userImg,
    content,
    codeContent,
    codeType,
    viewCount,
    createdAt,
  } = await selectReview(Number(id))

  if (!reviewId) {
    throw new Error('리뷰 조회에 실패했습니다.')
  }

  const decompressedCode = decompressGzip(codeContent)

  if (!decompressedCode) {
    throw new Error('코드 내용을 불러오는데 실패했습니다.')
  }

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center space-x-2">
          {userImg && (
            <div className="w-6 h-6 relative rounded-full overflow-hidden">
              <Image
                src={userImg}
                alt={`${username}의 프로필 이미지`}
                width={30}
                height={30}
                className="object-cover"
              />
            </div>
          )}
          <span className="font-medium">{username}</span>
          <span>|</span>
          <span>{createdAt && getFormattedCreatedAt(createdAt)}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span>조회수 : {viewCount ?? 1}회</span>
          </div>
          <LikeComponent reviewId={reviewId} />
          <button className="text-blue-500">🔗 공유</button>
          <ReviewButtonsComponent reviewId={reviewId} userNum={userNum} />
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-gray-700 dark:text-gray-300 mb-4">
        {content}
      </div>

      <ReviewCodeArea
        reviewId={reviewId}
        code={decompressedCode}
        language={codeType}
      />
      <hr className="my-8 border-gray-300 dark:border-gray-700" />
      <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <CommentSection id={reviewId} commentTarget={COMMENT_TARGET.REVIEW} />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Link
          href={'/'}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-grey-500 transition"
        >
          목록 보기
        </Link>
      </div>
    </div>
  )
}

export default ReviewDetailPage
