'use client'

import CodeMirror from '@uiw/react-codemirror'
import { useEffect, useState } from 'react'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { languageExtensions } from '@/entities/editor/types'
import { useAICommentQuery } from '../hooks/useAICommentQuery'
import { decompressGzip } from '@/features/editor/helper'
import { removeTripleBackticks } from '../helper'

const AISection = ({ reviewId }: { reviewId: number }) => {
  const { theme } = useThemeStore()
  const [deCompCode, setDeCompCode] = useState('')
  const [safeLanguage, setSafeLanguage] = useState('javascript')

  const { data: aiData, isSuccess, isLoading } = useAICommentQuery(reviewId)

  useEffect(() => {
    if (aiData) {
      const deCompCode = removeTripleBackticks(
        decompressGzip(aiData.codeContent) ?? '',
      )
      const safeLanguage = aiData?.codeType ?? 'javascript'

      setDeCompCode(deCompCode)
      setSafeLanguage(safeLanguage)
    }
  }, [aiData])

  if (isLoading) return null

  return (
    <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
      {isSuccess && aiData.commentId ? (
        <>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">
            🤖 AI 피드백
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-100 mb-4">
            {aiData.content}
          </p>
          <CodeMirror
            value={deCompCode}
            extensions={[languageExtensions[safeLanguage]]}
            theme={theme === 'light' ? undefined : dracula}
            readOnly={true}
            basicSetup={{ highlightActiveLine: false }}
            className="my-8 border-gray-300 dark:border-gray-700"
            style={{ minHeight: '100%', maxHeight: '100%', width: '100%' }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          AI 피드백이 아직 없습니다.
        </p>
      )}
    </div>
  )
}
export default AISection
