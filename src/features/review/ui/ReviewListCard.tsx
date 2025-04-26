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
  likeCount,
  createdAt,
}: {
  reviewId: number
  username: string
  userImg: string
  title: string
  content: string
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
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 break-words">
        {title}
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1 overflow-hidden line-clamp-5 break-words">
        {content}
      </p>

      <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-3 max-w-[150px]">
          <div className="relative w-7 h-7 rounded-full overflow-hidden">
            <Image
              src={userImg}
              alt=""
              width={28}
              height={28}
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate max-w-[10px]">
            {username}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-xs text-gray-500 dark:text-gray-400 min-w-[120px]">
          <span>{createdAt && getFormattedCreatedAt(createdAt)}</span>
          <div className="flex items-center gap-1">
            <span>👍</span>
            <span>{likeCount ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewListCard
