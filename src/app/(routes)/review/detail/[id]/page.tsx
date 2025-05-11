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
import AISection from '@/features/ai/ui/AISection'

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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 relative">
            <Image
              src={userImg}
              alt="프로필 이미지"
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {createdAt && getFormattedCreatedAt(createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <LikeComponent reviewId={reviewId} />
          <ReviewButtonsComponent
            reviewId={reviewId}
            userNum={userNum}
            code={decompressedCode}
            language={codeType}
          />
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

      <AISection reviewId={reviewId} />

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
