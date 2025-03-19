'use client'

import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { motion } from 'framer-motion'

export default function RealtimeCodeEditor() {
  const [code, setCode] = useState(
    "// 실시간 코드 공유\nconsole.log('Hello, World!');",
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <motion.h1
        className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        실시간 코드 공유
      </motion.h1>
      <div className="w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700">
        <CodeMirror
          value={code}
          height="500px"
          extensions={[javascript()]}
          onChange={(value) => setCode(value)}
          className="w-full h-full p-4 text-sm font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
        />
      </div>
      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md active:opacity-80 transition">
        공유하기
      </button>
    </div>
  )
}
