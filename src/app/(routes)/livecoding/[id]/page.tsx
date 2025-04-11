'use client'
import { useEffect, useState, useCallback } from 'react'
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
import useUserStore from '@/shared/store/useUserStore'

export default function LiveCodingPage() {
  const router = useRouter()
  const params = useParams()
  const roomId = typeof params.id === 'string' ? params.id : ''
  const { user } = useUserStore()

  const { connect, disconnect, messages, sendMessage } = useWebSocketStore()

  const [roomInfo, setRoomInfo] = useState<SelectLiveCodingResDTO | null>(null)
  const [snippet, setSnippet] = useState<SelectLiveCodingSnippetResDTO | null>(null)
  const [ready, setReady] = useState(false)

  const checkValid = useCallback(
    (roomInfoRes: SelectLiveCodingResDTO) => {
      if (!user?.userNum) {
        alert('유효한 사용자가 아닙니다.')
        disconnect() 
        router.replace('/')
        return
      }

      if (user.userNum === roomInfoRes.hostId) return

      const participants = roomInfoRes.participants
      if (participants.length >= 3) {
        alert('참여인원 초과')
        disconnect() 
        router.replace('/')
      } else if (!participants.includes(user.userNum)) {
        alert('초대되지 않은 사용자입니다.')
        disconnect() 
        router.replace('/')
      }
    },
    [user?.userNum, router],
  )

  const selectRoom = useCallback(async () => {
    try {
      const roomInfoRes = await selectLiveCoding(roomId)
      setRoomInfo(roomInfoRes)
      checkValid(roomInfoRes)

      const snippetData = await selectLiveCodingSnippet(roomInfoRes.hostId)
      setSnippet(snippetData)
      setReady(true)
    } catch (e) {
      console.error('❌ 방 조회 실패:', e)
      disconnect() 
      router.replace('/')
    }
  }, [roomId, checkValid, router])

  useEffect(() => {
    if (roomId) {
      connect(roomId)
      return () => disconnect()
    }
  }, [roomId, connect, disconnect])

  useEffect(() => {
    if (user?.userNum && roomId) {
      selectRoom()
    }
  }, [roomId, user?.userNum, selectRoom])


  if (!ready) {
    return <div className="p-4">로딩 중...</div>
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <CodeEditor roomInfo={roomInfo} snippet={snippet} />
      </div>
      <Chat
        roomInfo={roomInfo}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  )
}
