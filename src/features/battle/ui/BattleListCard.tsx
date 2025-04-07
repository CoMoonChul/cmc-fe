import { useRouter } from 'next/navigation'
import { formatNumberWithCommas } from '@/shared/lib/number'
import { getFormattedCreatedAt } from '@/shared/lib/date'
import Image from 'next/image'

const BattleListCard = ({
  battleId,
  title,
  content,
  leftVote,
  rightVote,
  createdAt,
  username,
  userImg,
}: {
  battleId: number
  title: string
  content: string
  endTime?: string
  leftVote: number
  rightVote: number
  createdAt?: string
  updatedAt?: string
  username: string
  userImg: string
}) => {
  const isVoted = leftVote + rightVote > 0
  const leftVotePercentage = isVoted
    ? Math.round((leftVote / (leftVote + rightVote)) * 100)
    : 0
  const rightVotePercentage = isVoted
    ? Math.round((rightVote / (leftVote + rightVote)) * 100)
    : 0
  const router = useRouter()

  const onClickCard = () => {
    router.push(`/battle/detail/${battleId}`)
  }

  const onClickGoResult = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    router.push(`/battle/result/${battleId}`)
  }

  return (
    <div
      onClick={onClickCard}
      className="relative bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 hover:shadow-lg cursor-pointer transition duration-200 h-96 flex flex-col"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 leading-relaxed overflow-hidden max-h-full">
        {content}
      </p>
      {isVoted ? (
        <>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                🔥 현재 투표율
              </p>
              <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden mt-1 flex">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${leftVotePercentage}%` }}
                />
                <div
                  className="bg-red-500 h-full"
                  style={{ width: `${rightVotePercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                <span>🟦 {leftVotePercentage}% 선택</span>
                <span>🟥 {rightVotePercentage}% 선택</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              총 {formatNumberWithCommas(leftVote + rightVote)}명이
              투표했습니다.
            </p>
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={onClickGoResult}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex-shrink-0"
              >
                결과 보기
              </button>

              <div className="flex items-center gap-2 px-3 py-1 text-sm text-gray-500 dark:text-gray-400 overflow-hidden">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 relative flex-shrink-0">
                  <Image
                    src={userImg}
                    alt="프로필"
                    width={24}
                    height={24}
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <div className="truncate text-end">
                  <span className="block">{username}</span>
                  {createdAt && (
                    <span className="block text-xs text-gray-400 dark:text-gray-500">
                      {getFormattedCreatedAt(createdAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                아직 투표가 진행되지 않았어요.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                투표에 참여해 보세요!
              </p>
            </div>

            <div className="flex justify-end mt-3">
              <div className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400">
                {username}
                {createdAt && `, ${getFormattedCreatedAt(createdAt)}`}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default BattleListCard
