'use client'

import { useParams } from 'next/navigation'
import CodeEditor from '@/features/livecoding/ui/CodeEditor'
import Chat from '@/features/livecoding/ui/Chat'
import useWebSocket from '@/features/livecoding/hooks/useWebSocket'
import { selectLiveCoding } from '@/entities/livecoding/api'
import { useEffect, useState } from "react";
import { SelectLiveCodingResDTO } from '#/generate/livecoding/api'

export default function LiveCodingPage() {
  const params = useParams()
  const roomId = typeof params.id === "string" ? params.id : ""

  const [roomInfo, setRoomInfo] = useState<SelectLiveCodingResDTO | null>(null)
  const [isRoomVerified, setIsRoomVerified] = useState(false) // 방이 유효한지 확인하는 상태
  const { messages, sendMessage } = useWebSocket(roomId, isRoomVerified)

  const selectRoom = async () => {
    try {
      const roomInfoRes = await selectLiveCoding(roomId)
      setRoomInfo(roomInfoRes) // roomInfo 업데이트
      setIsRoomVerified(true) // 방 정보가 유효하다면 연결 상태 변경
    } catch (e) {
      console.error("❌ 방 조회 실패:", e)
    }
  }

  useEffect(() => {
    if (!roomId || isRoomVerified) {
      return
    }

    (async () => {
      await selectRoom() // 한 번만 호출되도록 조정
    })()
  }, [roomId, isRoomVerified]) // roomId나 isRoomVerified 변경 시에만 실행

  return (
    <div className="flex h-screen">
      {/* 코드 편집기 */}
      <div className="flex-1">
        <CodeEditor roomInfo={roomInfo} />
      </div>

      {/* 채팅 영역 (웹소켓 메시지와 전송 함수 전달) */}
      <Chat messages={messages} sendMessage={sendMessage} />
    </div>
  )
}
