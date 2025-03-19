'use client'

import { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { useThemeStore } from '@/shared/store/useThemeStore'

interface CodeEditorModalProps {
  initialCode: string
  initialLanguage: 'javascript' | 'python' | 'java'
  onClose: () => void
  onSave: (
    updatedCode: string,
    updatedLanguage: 'javascript' | 'python' | 'java',
  ) => void
}

const CodeEditorModal = ({
  initialCode,
  initialLanguage,
  onClose,
  onSave,
}: CodeEditorModalProps) => {
  const [code, setCode] = useState(initialCode)
  const [language, setLanguage] = useState<'javascript' | 'python' | 'java'>(
    initialLanguage,
  )
  const { theme } = useThemeStore()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript()
      case 'python':
        return python()
      case 'java':
        return java()
      default:
        return javascript()
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[90vw] h-[85vh] max-w-5xl shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 바 - 제목 & 언어 선택 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">코드 수정</h2>

          {/* 언어 선택 드롭다운 */}
          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value as 'javascript' | 'python' | 'java')
            }
            className="p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        {/* 코드 편집 영역 */}
        <div className="flex-1 overflow-auto border border-gray-300 dark:border-gray-700 rounded-md">
          <CodeMirror
            value={code}
            extensions={[getLanguageExtension()]}
            theme={theme === 'light' ? undefined : dracula}
            className="w-full h-full"
            onChange={(value) => setCode(value)}
            basicSetup={{ indentOnInput: true }}
            style={{ minHeight: '70vh', maxHeight: '75vh' }}
          />
        </div>

        {/* 하단 버튼 */}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => {
              onSave(code, language)
              onClose()
            }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default CodeEditorModal
