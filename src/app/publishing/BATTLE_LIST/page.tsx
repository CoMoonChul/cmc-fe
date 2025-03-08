import BattleListDropDown from '../COMPONENT/BattleListDropDown'
import BattleListCard from '../COMPONENT/BattleListCard'

const BattleList = () => {
  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          배틀 작성하기
        </button>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg dark:border-gray-600 overflow-visible">
          <button className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            최신
          </button>
          <button className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            인기
          </button>
          <BattleListDropDown />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <BattleListCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default BattleList
