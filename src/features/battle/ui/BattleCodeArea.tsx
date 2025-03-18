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
}: {
  battleId: number
  codeContentLeft: string
  codeTypeLeft: string
  codeContentRight: string
  codeTypeRight: string
}) => {
  const [votedPosition, setVotedPosition] = useState<'left' | 'right' | null>(
    null,
  )

  const { data } = useBattleVoteStateQuery(battleId)

  const handleVote = (position: 'left' | 'right') => {
    setVotedPosition(position)
  }

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
        isVoted={votedPosition === 'left'}
        language={codeTypeLeft}
        position="left"
        editable={false}
        onVote={handleVote}
      />
      <div className="text-center text-lg font-bold min-w-max px-2 whitespace-nowrap">
        VS
      </div>
      <BattleCodeBlock
        battleId={battleId}
        code={codeContentRight}
        isVoted={votedPosition === 'right'}
        language={codeTypeRight}
        position="right"
        editable={false}
        onVote={handleVote}
      />
    </>
  )
}

export default BattleCodeArea
