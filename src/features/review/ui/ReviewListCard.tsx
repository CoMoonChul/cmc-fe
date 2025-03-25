import { useRouter } from 'next/navigation'
import { formatNumberWithCommas } from '@/shared/lib/number'
import { getFormattedCreatedAt } from '@/shared/lib/date'

const ReviewListCard = ({
  reviewId,
  username,
  title,
  content,
  viewCount,
  likeCount,
  createdAt,
  updatedAt,
}: {
  reviewId: number
  username: string
  title: string
  content: string
  viewCount?: number
  likeCount?: number
  createdAt?: string
  updatedAt?: string
}) => {
  const router = useRouter()

  const onClickCard = () => {
    router.push(`/review/detail/${reviewId}`)
  }

  return (
    <div
      onClick={onClickCard}
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span className="mr-2">
            <i className="fas fa-eye mr-1"></i>
            {`👀 : ${viewCount ?? 0}`}
          </span>
          <span>
            <i className="fas fa-thumbs-up mr-1"></i>
            {`👍 : ${likeCount ?? 0}`}
          </span>
        </div>
      </div>
      {/* 내용 */}
      <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
        {content}
      </p>

      {/* 작성자 & 작성일 */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
        <span>@{username}</span>
        <span>{createdAt && `${getFormattedCreatedAt(createdAt)}`}</span>
      </div>
    </div>
  )
}

export default ReviewListCard
