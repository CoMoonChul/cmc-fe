'use client'

import { useState, useRef, useEffect } from 'react'
import { LIVECODING } from '#/generate'

export default function Chat({
  roomInfo,
  messages,
  sendMessage,
}: {
  roomInfo: LIVECODING.SelectLiveCodingResDTO | null
  messages: string[]
  sendMessage: (message: string) => void
}) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const chatBoxRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      sendMessage(input)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="w-1/5 p-4 bg-gray-200 dark:bg-gray-800 border-l border-gray-400 dark:border-gray-700 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          채팅
        </h2>
      </div>

      {/* 채팅 메시지 영역 */}
      <div
        ref={chatBoxRef}
        className="flex-grow h-72 overflow-y-auto p-2 border rounded-lg bg-white dark:bg-gray-900"
        onClick={() => inputRef.current?.focus()}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-600 mb-1 text-sm text-gray-900 dark:text-gray-100"
          >
            {message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 채팅 입력 영역 */}
      <div className="mt-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring focus:ring-blue-400"
          placeholder="메시지 입력... (Enter: 전송, Shift+Enter: 줄바꿈)"
        />
      </div>
    </div>
  )
}
