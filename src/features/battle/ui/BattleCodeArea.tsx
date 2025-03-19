'use client'

import { useState, useEffect } from 'react'
import BattleCodeBlock from '@/features/battle/ui/BattleCodeBlock'
import { useBattleVoteStateQuery } from '@/features/battle/hooks/useBattleVoteStateQuery'

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

  const { data } = useBattleVoteStateQuery(battleId)

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
    if (data?.voteValue === 0) {
      setVotedPosition('left')
    } else if (data?.voteValue === 1) {
      setVotedPosition('right')
    }
  }, [data?.voteValue])

  return (
    <>
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
    </>
  )
}

export default BattleCodeArea
