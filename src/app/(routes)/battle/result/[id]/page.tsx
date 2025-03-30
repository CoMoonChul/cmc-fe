'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useBattleDetailQuery } from '@/features/battle/hooks/useBattleDetailQuery'
import { getFormattedCreatedAt } from '@/shared/lib/date'
import { COMMENT_TARGET } from '@/features/comment/types'
import BattleCodeArea from '@/features/battle/ui/BattleCodeArea'
import BattleResultBar from '@/features/battle/ui/BattleResultBar'
import CommentSection from '@/features/comment/ui/CommentSection'
import { decompressGzip } from '@/features/editor/helper'
import { usePopupStore } from '@/shared/store/usePopupStore'

const BattleResultPage = () => {
  const { id: queryBattleId } = useParams()
  const router = useRouter()
  const battleId = Number(queryBattleId)
  const { openPopup } = usePopupStore.getState()
  const { data, isSuccess, isLoading } = useBattleDetailQuery(battleId)

  const { deCompCodeLeft, deCompCodeRight } = useMemo(() => {
    if (!data) return { deCompCodeLeft: '', deCompCodeRight: '' }

    const left = decompressGzip(data.codeContentLeft)
    const right = decompressGzip(data.codeContentRight)

    if (!left || !right) {
      openPopup('코드 압축해제에 실패했어요. 코드 내용을 확인해 주세요.', '')
      return { deCompCodeLeft: '', deCompCodeRight: '' }
    }

    return { deCompCodeLeft: left, deCompCodeRight: right }
  }, [data, openPopup])

  useEffect(() => {
    if (isNaN(battleId)) {
      router.replace('/404')
    }
  }, [battleId, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    )
  }

  if (!isSuccess || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
        <p className="text-xl font-semibold">존재하지 않는 배틀입니다.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>

      <div className="flex items-center justify-between space-x-4 mb-4">
        <div>
          <p className="text-sm font-medium">{data.username}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {data.createdAt ? getFormattedCreatedAt(data.createdAt) : ''}
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          조회수: {data.viewCount}회
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <BattleCodeArea
          battleId={data.battleId}
          codeContentLeft={deCompCodeLeft}
          codeTypeLeft={data.codeTypeLeft}
          codeContentRight={deCompCodeRight}
          codeTypeRight={data.codeTypeRight}
          leftVote={data.leftVote}
          rightVote={data.rightVote}
          resultMode={true}
        />
      </div>

      <BattleResultBar leftVote={data.leftVote} rightVote={data.rightVote} />

      <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">{data.content}</p>
      </div>

      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      <CommentSection id={battleId} commentTarget={COMMENT_TARGET.BATTLE} />
    </div>
  )
}

export default BattleResultPage
