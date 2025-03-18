'use client'
import { useState } from 'react'
import { BATTLE } from '#/generate'
import CodeMirror from '@uiw/react-codemirror'
import { dracula } from '@uiw/codemirror-theme-dracula'
import CodeModal from './CodeModal'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { languageExtensions } from '@/entities/editor/types'
import { useUpdateVoteBattle } from '@/features/battle/hooks/useUpdateVoteBattle'
import { useInvalidateBattleVoteState } from '@/features/battle/hooks/useInvalidateBattleVoteState'

const BattleCodeBlock = ({
  battleId,
  code,
  isVoted,
  language,
  position,
  editable,
  onVote,
}: {
  battleId: number
  code: string
  isVoted: boolean
  language: string
  position: 'left' | 'right'
  editable: boolean
  onVote: (position: 'left' | 'right') => void
}) => {
  const [selectedCode, setSelectedCode] = useState<{
    code: string
    editable: boolean
    language: string
  } | null>(null)

  const { theme } = useThemeStore()
  const safeLanguage = language ?? 'javascript'
  const voteBattleMutation = useUpdateVoteBattle()
  const invalidateBattleVoteState = useInvalidateBattleVoteState()

  const onClickCode = () => {
    const voteReq: BATTLE.UpdateVoteBattleReqDTO = {
      battleId,
      voteValue: position === 'left' ? 0 : 1,
    }
    voteBattleMutation.mutate(voteReq, {
      onSuccess: (data) => {
        invalidateBattleVoteState(battleId)
        onVote(position)
      },
    })
  }

  return (
    <div
      className={`relative bg-gray-200 dark:bg-gray-800 p-2 rounded-lg h-96 flex flex-col overflow-hidden 
        ${isVoted ? 'border-2 border-blue-500' : 'border border-gray-300 dark:border-gray-700'}
        ${selectedCode ? '' : 'hover:scale-105 active:opacity-80 transition-transform duration-300'}
      `}
      onClick={onClickCode}
    >
      <button
        className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-md z-10"
        onClick={() =>
          setSelectedCode({ code, editable, language: safeLanguage })
        }
      >
        전체보기
      </button>

      <div className="flex-1 w-full overflow-auto">
        <CodeMirror
          value={code}
          extensions={[languageExtensions[safeLanguage]]}
          theme={theme === 'light' ? undefined : dracula}
          className="w-full h-full rounded-md"
          readOnly={true}
          basicSetup={{ highlightActiveLine: false }}
          style={{ minHeight: '100%', maxHeight: '100%', width: '100%' }}
        />
      </div>

      {selectedCode && (
        <CodeModal
          code={selectedCode.code}
          editable={selectedCode.editable}
          language={selectedCode.language as 'javascript' | 'python' | 'html'}
          onClose={() => setSelectedCode(null)}
        />
      )}
    </div>
  )
}

export default BattleCodeBlock
