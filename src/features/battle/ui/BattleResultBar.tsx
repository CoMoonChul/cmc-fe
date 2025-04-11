'use client'
import { motion } from 'framer-motion'

const BattleResultBar = ({
  leftVote,
  rightVote,
}: {
  leftVote: number
  rightVote: number
}) => {
  const totalVotes = leftVote + rightVote
  const leftVotePercentage = totalVotes
    ? Math.round((leftVote / totalVotes) * 100)
    : 50
  const rightVotePercentage = totalVotes
    ? Math.round((rightVote / totalVotes) * 100)
    : 50

  return (
    <div className="mt-6 text-center">
      <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">
        투표 결과
      </h2>

      <div className="flex justify-center items-center space-x-4 mt-2">
        <p className="text-sm font-medium text-blue-500">
          {leftVote}표 ({leftVotePercentage}%)
        </p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          VS
        </p>
        <p className="text-sm font-medium text-red-500">
          {rightVote}표 ({rightVotePercentage}%)
        </p>
      </div>

      <div className="relative mt-3 w-full max-w-lg mx-auto h-6 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${leftVotePercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute right-0 top-0 h-full bg-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${rightVotePercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default BattleResultBar
