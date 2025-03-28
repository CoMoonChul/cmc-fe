'use client'

import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { useThemeStore } from '@/shared/store/useThemeStore'
import ReviewMetaModal from '../COMPONENT/ReviewMetaModal'

const ReviewFormPage = () => {
  // 수정/등록 분기
  const isEditMode = false

  const { theme } = useThemeStore()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [code, setCode] = useState('// 코드 내용을 입력하세요.')
  const [metaModalOpen, setMetaModalOpen] = useState(false)

  const onClickConfirm = () => {
    setMetaModalOpen(true)
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 h-[calc(100vh-80px)]">
        <h1 className="text-2xl font-bold">
          리뷰 {isEditMode ? '수정' : '등록'}
        </h1>

        <div className="flex flex-1 gap-6 min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 30))}
                placeholder="제목을 입력하세요 (최대 30자)"
                className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block mb-2 text-sm font-medium">내용</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                className="flex-1 px-4 py-2 resize-none rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 placeholder-gray-400 dark:placeholder-gray-500 overflow-y-auto"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 rounded-md bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 text-sm">
                나가기
              </button>
              <button
                onClick={onClickConfirm}
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm"
              >
                {isEditMode ? '수정하기' : '등록하기'}
              </button>
            </div>
          </div>

          <div className="w-1/2 flex flex-col min-h-0">
            <label className="block mb-2 text-sm font-medium">
              코드 에디터
            </label>
            <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
              <CodeMirror
                value={code}
                onChange={(val) => setCode(val)}
                extensions={[javascript()]}
                theme={theme === 'light' ? undefined : dracula}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <ReviewMetaModal
        open={metaModalOpen}
        onClose={() => setMetaModalOpen(false)}
        isEdit={false}
      />
    </div>
  )
}

export default ReviewFormPage
