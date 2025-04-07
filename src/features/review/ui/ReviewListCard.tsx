'use client'

import { useRouter } from 'next/navigation'
import { getFormattedCreatedAt } from '@/shared/lib/date'
import Image from 'next/image'

const ReviewListCard = ({
  reviewId,
  username,
  userImg,
  title,
  content,
  viewCount,
  likeCount,
  createdAt,
}: {
  reviewId: number
  username: string
  userImg: string
  title: string
  content: string
  viewCount?: number
  likeCount?: number
  createdAt?: string
}) => {
  const router = useRouter()

  const onClickCard = () => {
    router.push(`/review/detail/${reviewId}`)
  }

  return (
    <div
      onClick={onClickCard}
      className="flex flex-col justify-between h-96 overflow-hidden p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
    >
      {/* 제목 */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 break-words">
        {title}
      </h2>

      {/* 본문 */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1 overflow-hidden line-clamp-5 break-words">
        {content}
      </p>

      {/* 구분선 */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

      {/* 프로필 + 작성일자 + 조회수/좋아요 */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7 rounded-full overflow-hidden">
            <Image
              src={userImg}
              alt="프로필 이미지"
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
            @{username}
          </span>
        </div>

        <div className="flex flex-col items-end gap-1 text-xs text-gray-500 dark:text-gray-400">
          <span>{createdAt && getFormattedCreatedAt(createdAt)}</span>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <span>👀</span>
              <span>{viewCount ?? 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👍</span>
              <span>{likeCount ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewListCard
