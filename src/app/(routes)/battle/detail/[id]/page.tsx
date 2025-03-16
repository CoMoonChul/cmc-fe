import BattleCodeBlock from '@/features/battle/ui/BattleCodeBlock'
import { selectBattle } from '@/entities/battle/api'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { getFormattedCreatedAt } from '@/shared/lib/date'

interface BattleDetailPageProps {
  params: Promise<{ id: string }>
}

const BattleDetailPage: FC<BattleDetailPageProps> = async ({ params }) => {
  const { id } = await params
  if (isNaN(Number(id))) {
    notFound()
  }

  const {
    battleId,
    title,
    content,
    codeContentLeft,
    codeContentRight,
    codeTypeLeft,
    codeTypeRight,
    viewCount,
    username,
    voteValue,
    createdAt,
  } = await selectBattle(Number(id))

  if (!battleId) {
    throw new Error('배틀 조회에 실패했습니다...')
  }

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <div className="flex items-center justify-between space-x-4 mb-4">
        <div>
          <p className="text-sm font-medium">{username}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {createdAt && getFormattedCreatedAt(createdAt)}
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          조회수: {viewCount ?? 1}회
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <BattleCodeBlock
          battleId={battleId}
          code={codeContentLeft}
          isVoted={false}
          language={codeTypeLeft}
          position="left"
          editable={false}
        />
        <div className="text-center text-lg font-bold min-w-max px-2 whitespace-nowrap">
          VS
        </div>
        <BattleCodeBlock
          battleId={battleId}
          code={codeContentRight}
          isVoted={false}
          language={codeTypeRight}
          position="right"
          editable={false}
        />
      </div>

      <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
        코드를 클릭해 투표하세요
      </div>

      <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
      </div>
    </div>
  )
}

export default BattleDetailPage
