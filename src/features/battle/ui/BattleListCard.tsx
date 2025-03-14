const BattleListCard = ({
  battleId,
  title,
  content,
  endTime,
  leftVote,
  rightVote,
  created_at,
  updated_at,
}: {
  battleId?: number
  title?: string
  content?: string
  endTime?: string
  leftVote?: number
  rightVote?: number
  created_at?: string
  updated_at?: string
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 hover:shadow-lg cursor-pointer">
      <div className="p-2">
        <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mb-2">
          {title}
        </div>
        <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded">
          {content}
        </div>
        <div className="flex justify-between mt-4">
          <button className="px-3 py-1 text-sm border border-gray-400 text-gray-700 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            결과 보기
          </button>
          <button className="px-3 py-1 text-sm border border-gray-400 text-gray-700 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            투표 정보
          </button>
        </div>
      </div>
    </div>
  )
}

export default BattleListCard
