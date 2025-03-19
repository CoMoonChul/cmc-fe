'use client'

import { useParams } from 'next/navigation'
import CodeEditor from '@/features/livecoding/ui/CodeEditor'
import Chat from '@/features/livecoding/ui/Chat'
import useWebSocket from '@/features/livecoding/hooks/useWebSocket'
import { selectLiveCoding } from '@/entities/livecoding/api'
import { LIVECODING } from '#/generate'
import { useEffect, useState } from "react";


export default function LiveCodingPage() {
  const params = useParams()
  const roomId = typeof params.id === 'string' ? params.id : '' // ✅ roomId 가져오기

  const [roomInfo, setRoomInfo] = useState<LIVECODING.SelectLiveCodingResDTO | null>(null);
  const { messages, sendMessage } = useWebSocket(roomId) // ✅ 웹소켓 연결 (페이지에서 관리)

  const selectRoom = async ()=> {
    try {
      const roomInfoRes = await selectLiveCoding(roomId)
      setRoomInfo(roomInfoRes)
    } catch (e) {
      console.error("❌ 방 조회 실패:", e);
    }
  }

  const copyInviteLink = () => {
    if (!roomInfo?.link) {
      return;
    }
    navigator.clipboard
      .writeText(roomInfo.link)
      .then(() => alert("✅ 초대 링크가 복사되었습니다!"))
      .catch(() => alert("❌ 초대 링크 복사에 실패했습니다."));
  };



  useEffect(() => {
    if (!roomId) {
      return
    }

    (async () => {
      await selectRoom();
    })();

  }, [roomId]); // roomId가 변경될 때 한 번만 실행


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
