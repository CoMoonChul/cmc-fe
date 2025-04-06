'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import CodeEditor from '@/features/livecoding/ui/CodeEditor'
import Chat from '@/features/livecoding/ui/Chat'
import {
  selectLiveCoding,
  selectLiveCodingSnippet,
} from '@/entities/livecoding/api'
import useWebSocketStore from '@/features/livecoding/store/useWebSocketStore'
import {
  SelectLiveCodingResDTO,
  SelectLiveCodingSnippetResDTO,
} from '#/generate/livecoding/api'

export default function LiveCodingPage() {
  const router = useRouter()
  const params = useParams()
  const roomId = typeof params.id === 'string' ? params.id : ''

  const { connect, disconnect, messages, sendMessage, isConnected } =
    useWebSocketStore()
  const [roomInfo, setRoomInfo] = useState<SelectLiveCodingResDTO | null>(null)
  const [snippet, setSnippet] = useState<SelectLiveCodingSnippetResDTO | null>(
    null,
  )

  useEffect(() => {
    if (roomId) {
      connect(roomId) // 웹소켓 연결
      return () => disconnect() // 컴포넌트 언마운트 시 웹소켓 종료
    }
  }, [roomId, connect, disconnect])

  const selectRoom = async () => {
    try {
      const roomInfoRes = await selectLiveCoding(roomId)

      setRoomInfo(roomInfoRes)
      const snippetData = await selectLiveCodingSnippet(roomInfoRes.hostId)
      setSnippet(snippetData)
    } catch (e) {
      console.error('❌ 방 조회 실패:', e)
      router.push('/')
    }
  }

  useEffect(() => {
    if (roomId) {
      selectRoom()
    }
  }, [roomId])

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <CodeEditor roomInfo={roomInfo} snippet={snippet} />
      </div>
      <Chat roomInfo={roomInfo} messages={messages} sendMessage={sendMessage} />
    </div>
  )
}
