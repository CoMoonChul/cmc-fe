'use client'
import { useEffect, useState, useCallback, useMemo } from 'react'
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

  const { connect, disconnect, messages, sendMessage, isConnected } =
    useWebSocketStore()

  const [roomInfo, setRoomInfo] = useState<SelectLiveCodingResDTO | null>(null)
  const [snippet, setSnippet] = useState<SelectLiveCodingSnippetResDTO | null>(null)

  const memoizedMessages = useMemo(() => messages, [messages])

  const checkValid = useCallback(
    (roomInfoRes: SelectLiveCodingResDTO) => {
      if (!user?.userNum) {
        alert('유효한 사용자가 아닙니다.')
        router.push('/')
        return
      }

      if (user.userNum === roomInfoRes.hostId) return

      const participants = roomInfoRes.participants
      if (participants.length >= 3) {
        alert('참여인원 초과')
        router.push('/')
      } else if (!participants.includes(user.userNum)) {
        alert('초대되지 않은 사용자입니다.')
        router.push('/')
      }
    },
    [user?.userNum, router],
  )

  const selectRoom = async () => {
    try {
      const roomInfoRes = await selectLiveCoding(roomId)
      setRoomInfo(roomInfoRes)
      checkValid(roomInfoRes)

      const snippetData = await selectLiveCodingSnippet(roomInfoRes.hostId)
      setSnippet(snippetData)
    } catch (e) {
      console.error('❌ 방 조회 실패:', e)
      router.push('/')
    }
  }

  useEffect(() => {
    if (roomId) {
      connect(roomId)
      return () => disconnect()
    }
  }, [roomId, connect, disconnect])

  useEffect(() => {
    if (user?.userNum) {
      selectRoom()
    }
  }, [roomId, user?.userNum])

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <CodeEditor roomInfo={roomInfo} snippet={snippet} />
      </div>
      <Chat
        roomInfo={roomInfo}
        messages={memoizedMessages}
        sendMessage={sendMessage}
      />
    </div>
  )
}
