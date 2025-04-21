import { selectBattle } from '@/entities/battle/api'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { getFormattedCreatedAt } from '@/shared/lib/date'
import BattleCodeArea from '@/features/battle/ui/BattleCodeArea'
import Link from 'next/link'
import { decompressGzip } from '@/features/editor/helper'
import BattleControlArea from '@/features/battle/ui/BattleControlArea'
import Image from 'next/image'
import CommentSection from '@/features/comment/ui/CommentSection'
import { COMMENT_TARGET } from '@/features/comment/types'

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
    userNum,
    userImg,
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
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center justify-between space-x-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 relative">
            <Image
              src={userImg}
              alt="프로필 이미지"
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {createdAt && getFormattedCreatedAt(createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <span>조회수 : {viewCount ?? 1}회</span>
          </div>
          <BattleControlArea battleId={battleId} auditerNum={userNum} />
        </div>
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
      <div className="mt-6 flex justify-end gap-3">
        <Link
          href={'/battle'}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-grey-500 transition"
        >
          목록 보기
        </Link>
        <Link
          href={`/battle/result/${battleId}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          결과 보기
        </Link>
      </div>
      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      <CommentSection id={battleId} commentTarget={COMMENT_TARGET.BATTLE} />
    </div>
  )
}

export default BattleDetailPage
