import { useRouter } from 'next/navigation'
import { formatNumberWithCommas } from '@/shared/lib/number'
import { getFormattedCreatedAt } from '@/shared/lib/date'

const ReviewListCard = ({
  review_id,
  username,
  title,
  content,
  view_count,
  like_count,
  created_at,
  updated_at,
}: {
  review_id?: number
  username?: string
  title?: string
  content?: string
  view_count?: number
  like_count?: number
  created_at?: string
  updated_at?: string
}) => {
  const router = useRouter()

  // const onClickCard = () => {
  //     router.push(`/review/detail/${reviewId}`)
  // }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
      {/* 제목 */}
      <h3 className="font-semibold">{title}</h3>

      {/* 내용 */}
      <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
        {content}
      </p>

      {/* 작성자 & 작성일 */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
        <span>@{username}</span>
        <span>{created_at && `, ${getFormattedCreatedAt(created_at)}`}</span>
      </div>
    </div>
  )
}

export default ReviewListCard
