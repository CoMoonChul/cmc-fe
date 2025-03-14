'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLiveCodingWebSocket } from '@/features/lcd/hooks/LiveCodingWebSocket'

export default function LiveCodingRoom() {
  const { id } = useParams()
  const [roomId, setRoomId] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      console.log('✅ roomId 설정됨:', id)
      setRoomId(id as string)
    }
  }, [id])

  const { messages, sendMessage, isConnected } = useLiveCodingWebSocket(
    roomId ?? '',
  )

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        라이브 코딩 방: {roomId ?? '로딩 중...'}
      </h1>

      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => sendMessage('Hello WebSocket!')}
        disabled={!roomId || !isConnected}
      >
        메시지 보내기
      </button>

      <div className="mt-4">
        <h2 className="font-bold">받은 메시지:</h2>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx} className="text-gray-700">
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
