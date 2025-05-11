'use client'

import CodeMirror from '@uiw/react-codemirror'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { languageExtensions } from '@/entities/editor/types'

const ReviewCodeArea = ({
  reviewId,
  code,
  language,
}: {
  reviewId: number
  code: string
  language: string
}) => {
  const { theme } = useThemeStore()
  const safeLanguage = language ?? 'javascript'

  return (
    <CodeMirror
      value={code}
      extensions={[languageExtensions[safeLanguage]]}
      theme={theme === 'light' ? undefined : dracula}
      readOnly={true}
      basicSetup={{ highlightActiveLine: false }}
      className="my-8 border-gray-300 dark:border-gray-700"
      style={{ minHeight: '100%', maxHeight: '100%', width: '100%' }}
    />
  )
}
export default ReviewCodeArea
