'use client'

import { useParams } from 'next/navigation'
import CodeEditor from '@/features/livecoding/ui/CodeEditor'
import Chat from '@/features/livecoding/ui/Chat'
import useWebSocket from '@/features/livecoding/hooks/useWebSocket'

export default function LiveCodingPage() {
  const params = useParams()
  const roomId = typeof params.id === 'string' ? params.id : '' // ✅ roomId 가져오기
  const { messages, sendMessage } = useWebSocket(roomId) // ✅ 웹소켓 연결 (페이지에서 관리)

  const copyInviteLink = () => {
    navigator.clipboard
      .writeText(`https://livecoding.example.com/room/${roomId}`)
      .then(() => alert('초대 링크가 복사되었습니다!'))
  }

  return (
    <div className="flex h-screen">
      {/* 코드 편집기 */}
      <div className="flex-1">
        <CodeEditor />
      </div>

      {/* 채팅 영역 (웹소켓 메시지와 전송 함수 전달) */}
      <Chat
        copyInviteLink={copyInviteLink}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  )
}
