import { useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { html } from '@codemirror/lang-html'
import { java } from '@codemirror/lang-java'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { useThemeStore } from '@/shared/store/useThemeStore'

const CodeModal = ({
  code,
  editable,
  language,
  onClose,
}: {
  code: string
  editable: boolean
  language: 'javascript' | 'python' | 'html' | 'java'
  onClose: () => void
}) => {
  const { theme, toggleTheme } = useThemeStore()

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
      case 'html':
        return html()
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
        className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[80vw] h-[80vh] max-w-4xl max-h-[80vh] shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">코드 전체보기</h2>
        </div>

        <div className="flex-1 overflow-auto max-h-[70vh] border border-gray-300 dark:border-gray-700 rounded-md">
          <CodeMirror
            value={code}
            extensions={[getLanguageExtension()]}
            theme={theme === 'light' ? undefined : dracula}
            className="w-full h-full"
            readOnly={!editable}
            basicSetup={{ indentOnInput: true }}
            style={{ minHeight: '60vh', maxHeight: '70vh' }}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default CodeModal
