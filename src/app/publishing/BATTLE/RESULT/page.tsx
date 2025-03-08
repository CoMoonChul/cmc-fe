const BattleResultPage = () => {
  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">배틀 제목</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-semibold">작성자 닉네임</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">5시간 전</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <span>조회수 120</span>
          <button className="text-blue-500 hover:underline">공유</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg h-96">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            코드 에디터 (읽기 전용)
          </p>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg h-96">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            코드 에디터 (읽기 전용)
          </p>
        </div>
      </div>

      <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">
          이 배틀의 설명이 여기에 들어갑니다. 비교할 코드들의 설명을 여기에
          작성할 수 있습니다.
        </p>
      </div>

      <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
        <h2 className="text-lg font-semibold mb-2">댓글</h2>
        <p className="text-gray-500 dark:text-gray-400">
          아직 댓글이 없습니다.
        </p>
      </div>
    </div>
  )
}

export default BattleResultPage
