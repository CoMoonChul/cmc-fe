import { selectBattle } from '@/entities/battle/api'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { getFormattedCreatedAt } from '@/shared/lib/date'
import BattleCodeArea from '@/features/battle/ui/BattleCodeArea'
import Link from 'next/link'
import { decompressGzip } from '@/features/editor/helper'

interface BattleDetailPageProps {
  params: Promise<{ id: string }>
}

const BattleDetailPage: FC<BattleDetailPageProps> = async ({ params }) => {
  const { id } = await params
  if (Number.isNaN(Number(id))) {
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
    leftVote,
    rightVote,
    viewCount,
    username,
    createdAt,
  } = await selectBattle(Number(id))

  if (!battleId) {
    throw new Error('배틀 조회에 실패했습니다.')
  }

  const deCompCodeLeft = decompressGzip(codeContentLeft)
  const deCompCodeRight = decompressGzip(codeContentRight)

  if (!deCompCodeLeft || !deCompCodeRight) {
    throw new Error('배틀 코드 내용 불러오기에 실패했습니다.')
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
        <BattleCodeArea
          battleId={battleId}
          codeContentLeft={deCompCodeLeft}
          codeTypeLeft={codeTypeLeft}
          codeContentRight={deCompCodeRight}
          codeTypeRight={codeTypeRight}
          leftVote={leftVote}
          rightVote={rightVote}
          resultMode={false}
        />
      </div>

      <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
        코드를 클릭해 투표하세요
      </div>

      <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
      </div>
      <div className="mt-6 flex justify-end">
        <Link
          href={`/battle/result/${battleId}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          결과 보기
        </Link>
      </div>
    </div>
  )
}

export default BattleDetailPage
