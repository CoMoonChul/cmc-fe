const BattleListCard = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 hover:shadow-lg cursor-pointer transition duration-200 h-96 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        다익스트라 알고리즘 재미써
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 leading-relaxed overflow-hidden max-h-full">
        문제 알고스팟 운영진이 모두 미로에 갇혔다. 미로는 N*M 크기이며, 총 1*1
        크기의 방으로 이루어져 있다. 미로는 빈 방 또는 벽으로 이루어져 있고, 빈
        방은 자유롭게 다닐 수 있지만, 벽은 부수지 않으면 이동할 수 없다.
        알고스팟 운영진은 여러명이지만, 항상 모... 문제 알고스팟 운영진이 모두
        미로에 갇혔다. 미로는 N*M 크기이며, 총 1*1 크기의 방으로 이루어져 있다.
        미로는 빈 방 또는 벽으로 이루어져 있고, 빈 방은 자유롭게 다닐 수 있지만,
        벽은 부수지 않으면 이동할 수 없다. 알고스팟 운영진은 여러명이지만, 항상
        모... 문제 알고스팟 운영진이 모두 미로에 갇혔다. 미로는 N*M 크기이며, 총
        1*1 크기의 방으로 이루어져 있다. 미로는 빈 방 또는 벽으로 이루어져 있고,
        빈 방은 자유롭게 다닐 수 있지만, 벽은 부수지 않으면 이동할 수 없다.
        알고스팟 운영진은 여러명이지만, 항상 모... 문제 알고스팟 운영진이 모두
        미로에 갇혔다. 미로는 N*M 크기이며, 총 1*1 크기의 방으로 이루어져 있다.
        미로는 빈 방 또는 벽으로 이루어져 있고, 빈 방은 자유롭게 다닐 수 있지만,
        벽은 부수지 않으면 이동할 수 없다. 알고스팟 운영진은 여러명이지만, 항상
        모... 문제 알고스팟 운영진이 모두 미로에 갇혔다. 미로는 N*M 크기이며, 총
        1*1 크기의 방으로 이루어져 있다. 미로는 빈 방 또는 벽으로 이루어져 있고,
        빈 방은 자유롭게 다닐 수 있지만, 벽은 부수지 않으면 이동할 수 없다.
        알고스팟 운영진은 여러명이지만, 항상 모... 문제 알고스팟 운영진이 모두
        미로에 갇혔다. 미로는 N*M 크기이며, 총 1*1 크기의 방으로 이루어져 있다.
        미로는 빈 방 또는 벽으로 이루어져 있고, 빈 방은 자유롭게 다닐 수 있지만,
        벽은 부수지 않으면 이동할 수 없다. 알고스팟 운영진은 여러명이지만, 항상
        모... 문제 알고스팟 운영진이 모두 미로에 갇혔다. 미로는 N*M 크기이며, 총
        1*1 크기의 방으로 이루어져 있다. 미로는 빈 방 또는 벽으로 이루어져 있고,
        빈 방은 자유롭게 다닐 수 있지만, 벽은 부수지 않으면 이동할 수 없다.
        알고스팟 운영진은 여러명이지만, 항상 모...
      </p>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            🔥 현재 투표율
          </p>
          <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden mt-1 flex">
            <div className="bg-blue-500 h-full" style={{ width: '65%' }} />
            <div className="bg-red-500 h-full" style={{ width: '35%' }} />
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
            <span>🟦 65% 선택</span>
            <span>🟥 35% 선택</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          총 1,245명이 투표했습니다.
        </p>

        <div className="flex justify-between mt-3">
          <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            결과 보기
          </button>
          <div className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400">
            임현우, 2020222
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleListCard
