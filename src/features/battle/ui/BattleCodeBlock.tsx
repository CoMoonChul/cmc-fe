'use client'
import { useState } from 'react'
import { BATTLE } from '#/generate'
import CodeMirror from '@uiw/react-codemirror'
import { dracula } from '@uiw/codemirror-theme-dracula'
import CodeModal from './CodeModal'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { languageExtensions } from '@/entities/editor/types'
import { useUpdateVoteBattle } from '@/features/battle/hooks/useUpdateVoteBattle'
import { motion } from 'framer-motion'
import { AxiosError } from 'axios'
import { useRouter, usePathname } from 'next/navigation'
import { usePopupStore } from '@/shared/store/usePopupStore'
import { useAuth } from '@/shared/hook/useAuth'

const BattleCodeBlock = ({
  battleId,
  code,
  isVoted,
  language,
  position,
  editable,
  onVote,
  resultMode,
  waveHeight,
  overlayColor,
}: {
  battleId: number
  code: string
  isVoted: boolean
  language: string
  position: 'left' | 'right'
  editable: boolean
  onVote: (position: 'left' | 'right') => void
  resultMode: boolean
  waveHeight?: number
  overlayColor?: string
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const [selectedCode, setSelectedCode] = useState<{
    code: string
    editable: boolean
    language: string
  } | null>(null)
  const { openPopup } = usePopupStore()
  const { theme } = useThemeStore()
  const checkAuth = useAuth()
  const safeLanguage = language ?? 'javascript'
  const voteBattleMutation = useUpdateVoteBattle(battleId, true)
  const isMotionDivVisible = waveHeight && overlayColor

  const goToLogin = () => {
    router.push(`/user/login?redirect=/battle/detail${battleId}`)
  }

  const onClickCode = async () => {
    if (resultMode) {
      return
    }
    const isLogin = await checkAuth()
    if (!isLogin) {
      openPopup('로그인 후에 가능합니다.', '', goToLogin)
      return
    }
    const voteReq: BATTLE.UpdateVoteBattleReqDTO = {
      battleId,
      voteValue: position === 'left' ? 0 : 1,
    }
    voteBattleMutation.mutate(voteReq, {
      onSuccess: () => {
        onVote(position)
      },
      onError: (e) => {
        if (e instanceof AxiosError && e.status === 403) {
          openPopup('로그인 후 투표가 가능합니다.', '', () => {
            router.replace(`/user/login?redirect=${pathname}`)
          })
        }
      },
    })
  }

  return (
    <div
      className={`relative bg-gray-200 dark:bg-gray-800 p-2 rounded-lg h-96 flex flex-col overflow-hidden
        ${isVoted ? ' border-2 border-blue-500' : ' border border-gray-300 dark:border-gray-700'}
        ${resultMode || selectedCode ? '' : ' hover:scale-105 active:opacity-80 transition-transform duration-300'}
      `}
      onClick={onClickCode}
    >
      {isMotionDivVisible ? (
        <motion.div
          className="absolute inset-0"
          style={{ background: overlayColor, zIndex: 10 }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: `inset(${100 - waveHeight}% 0% 0% 0%)` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ) : (
        <></>
      )}
      <button
        className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-md z-10"
        onClick={(e) => {
          e.stopPropagation()
          setSelectedCode({ code, editable, language: safeLanguage })
        }}
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
