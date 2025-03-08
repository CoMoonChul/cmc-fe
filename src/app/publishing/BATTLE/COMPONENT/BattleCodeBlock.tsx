'use client'

import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { dracula } from '@uiw/codemirror-theme-dracula'
import CodeModal from './CodeModal'
import { useThemeStore } from '@/shared/store/useThemeStore'

const BattleCodeBlock = ({
  code,
  editable,
}: {
  code: string
  editable: boolean
}) => {
  const [selectedCode, setSelectedCode] = useState<{
    code: string
    editable: boolean
    language: string
  } | null>(null)
  const { theme } = useThemeStore()

  return (
    <div className="relative bg-gray-200 dark:bg-gray-800 p-2 rounded-lg h-96 flex flex-col overflow-hidden">
      <button
        className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-md z-10"
        onClick={() =>
          setSelectedCode({ code, editable, language: 'javascript' })
        }
      >
        전체보기
      </button>

      <div className="flex-1 w-full overflow-auto">
        <CodeMirror
          value={code}
          extensions={[javascript()]}
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
