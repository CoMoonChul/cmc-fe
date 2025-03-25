'use client'

import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { useThemeStore } from '@/shared/store/useThemeStore'
import CommentSection from '@/features/comment/ui/CommentSection'

const sampleJavaScriptCode = `
// Example Code
function sayHello() {
  console.log("Hello, world!");
}
sayHello();
`

const ReviewDetailPage = () => {
  const [liked, setLiked] = useState(false)
  const { theme } = useThemeStore()

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      {/* 리뷰 제목 */}
      <h1 className="text-2xl font-bold mb-4">React 최적화 전략</h1>

      {/* 작성 정보 & 부가 정보 */}
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center space-x-2">
          <img
            src="/profile-placeholder.png"
            alt="작성자"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">dev_master</span>
          <span>|</span>
          <span>2025년 3월 9일</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span>👁 123</span>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center space-x-1 transition ${
              liked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <span>❤️</span>
            <span>{liked ? '좋아요 취소' : '좋아요'}</span>
          </button>
          <button className="text-blue-500">🔗 공유</button>
          <button className="text-green-500">✏ 수정하기</button>
        </div>
      </div>

      {/* 리뷰 내용 */}
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-gray-700 dark:text-gray-300 mb-4">
        React에서 성능을 최적화하는 다양한 방법을 정리했습니다...
      </div>

      {/* 코드 에디터 */}
      <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg overflow-hidden">
        <CodeMirror
          value={sampleJavaScriptCode}
          extensions={[javascript()]}
          theme={theme === 'light' ? undefined : dracula}
          className="w-full h-72 rounded-md"
          readOnly={true}
          basicSetup={{ highlightActiveLine: false }}
          style={{ minHeight: '100%', maxHeight: '100%', width: '100%' }}
        />
      </div>

      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      <CommentSection id={3} commentTarget={1} />
    </div>
  )
}

export default ReviewDetailPage
