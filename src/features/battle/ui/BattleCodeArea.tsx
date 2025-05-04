'use client'

import { useState, useEffect } from 'react'
import BattleCodeBlock from '@/features/battle/ui/BattleCodeBlock'
import { useBattleVoteStateQuery } from '@/features/battle/hooks/useBattleVoteStateQuery'
import BattleResultBar from '@/features/battle/ui/BattleResultBar'
import { useBattleDetailQuery } from '@/features/battle/hooks/useBattleDetailQuery'

const BattleCodeArea = ({
  battleId,
  codeContentLeft,
  codeTypeLeft,
  codeContentRight,
  codeTypeRight,
  leftVote,
  rightVote,
  resultMode,
}: {
  battleId: number
  codeContentLeft: string
  codeTypeLeft: string
  codeContentRight: string
  codeTypeRight: string
  leftVote: number
  rightVote: number
  resultMode: boolean
}) => {
  const [votedPosition, setVotedPosition] = useState<'left' | 'right' | null>(
    null,
  )
  const [isVoted, setIsVoted] = useState(false)

  const {
    data: battleData,
    isSuccess,
    isLoading,
  } = useBattleDetailQuery(battleId)

  const { data: voteData } = useBattleVoteStateQuery(battleId)

  const handleVote = (position: 'left' | 'right') => {
    setVotedPosition(position)
  }

  const leftWaveHeight = resultMode
    ? Math.round((leftVote / (leftVote + rightVote)) * 100)
    : undefined
  const rightWaveHeight = resultMode
    ? Math.round((rightVote / (leftVote + rightVote)) * 100)
    : undefined
  const leftWaveColor = resultMode ? 'rgba(59, 130, 246, 0.3)' : undefined
  const rightWaveColor = resultMode ? 'rgba(239, 68, 68, 0.3)' : undefined

  useEffect(() => {
    if (voteData?.voteValue === 0) {
      setVotedPosition('left')
      setIsVoted(true)
    } else if (voteData?.voteValue === 1) {
      setVotedPosition('right')
      setIsVoted(true)
    } else {
      setIsVoted(false)
    }
  }, [voteData?.voteValue])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <BattleCodeBlock
          battleId={battleId}
          code={codeContentLeft}
          isVoted={resultMode ? false : votedPosition === 'left'}
          language={codeTypeLeft}
          position="left"
          editable={false}
          onVote={handleVote}
          resultMode={resultMode}
          waveHeight={leftWaveHeight}
          overlayColor={leftWaveColor}
        />
        <div className="text-center text-lg font-bold min-w-max px-2 whitespace-nowrap">
          VS
        </div>
        <BattleCodeBlock
          battleId={battleId}
          code={codeContentRight}
          isVoted={resultMode ? false : votedPosition === 'right'}
          language={codeTypeRight}
          position="right"
          editable={false}
          onVote={handleVote}
          resultMode={resultMode}
          waveHeight={rightWaveHeight}
          overlayColor={rightWaveColor}
        />
      </div>
      {isSuccess && battleData ? (
        <BattleResultBar
          leftVote={battleData.leftVote}
          rightVote={battleData.rightVote}
        />
      ) : (
        <></>
      )}
      {!isVoted && (
        <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
          코드를 클릭해 투표하세요
        </div>
      )}
    </>
  )
}

export default BattleCodeArea
