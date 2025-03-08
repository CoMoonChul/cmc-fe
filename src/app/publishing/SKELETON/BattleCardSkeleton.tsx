const BattleCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
      <div className="p-2 animate-pulse">
        <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded" />
        <div className="flex justify-between mt-4">
          <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  )
}

export default BattleCardSkeleton
