'use client'

import { useParams, useRouter } from 'next/navigation'
import CodeEditor from '@/features/livecoding/ui/CodeEditor'
import Chat from '@/features/livecoding/ui/Chat'
import {
  selectLiveCoding,
  selectLiveCodingSnippet,
} from '@/entities/livecoding/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  SelectLiveCodingResDTO,
  SelectLiveCodingSnippetResDTO,
} from '#/generate/livecoding/api'
import useUserStore from '@/shared/store/useUserStore'
import useWebSocket from '@/features/livecoding/hooks/useWebSocket'

export default function LiveCodingPage() {
  const router = useRouter()
  const params = useParams()
  const roomId = typeof params.id === 'string' ? params.id : ''
  const { user } = useUserStore()

  const [roomInfo, setRoomInfo] = useState<SelectLiveCodingResDTO | null>(null)
  const { messages, sendMessage, isConnected } = useWebSocket(roomId)
  const [snippet, setSnippet] = useState<SelectLiveCodingSnippetResDTO | null>(
    null,
  )

  // 메모이제이션된 메시지 배열
  const memoizedMessages = useMemo(() => messages, [messages])

  const checkValid = useCallback(
    (roomInfoRes: SelectLiveCodingResDTO) => {
      console.log('checkValid checkValid checkValid')
      if (!user?.userNum) {
        alert('유효한 사용자가 아닙니다.')
        router.push('/')
        return
      }

      if (user.userNum === roomInfoRes.hostId) {
        // return
      }

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

  const selectRoom = useCallback(async () => {
    try {
      const roomInfoRes = await selectLiveCoding(roomId)
      setRoomInfo(roomInfoRes)
      checkValid(roomInfoRes) // checkValid 호출

      // selectLiveCodingSnippet() 호출 후 snippet 상태에 저장
      const snippetData = await selectLiveCodingSnippet(roomInfoRes.hostId)
      setSnippet(snippetData)
    } catch (e) {
      console.error('❌ 방 조회 실패:', e)
      router.push('/')
    }
  }, [roomId, checkValid, router])
  useEffect(() => {
    if (!user?.userNum) {
      console.log('userNum이 없으므로 방 정보 조회를 기다립니다.')
      return
    }
    selectRoom()
  }, [user?.userNum, selectRoom])

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
