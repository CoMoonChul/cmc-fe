'use client'

import { useParams, useRouter } from 'next/navigation'
import CodeEditor from '@/features/livecoding/ui/CodeEditor'
import Chat from '@/features/livecoding/ui/Chat'
import { selectLiveCoding } from '@/entities/livecoding/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SelectLiveCodingResDTO } from '#/generate/livecoding/api'
import useUserStore from '@/shared/store/useUserStore'
import useWebSocket from '@/features/livecoding/hooks/useWebSocket'

export default function LiveCodingPage() {
  const router = useRouter()
  const params = useParams()
  const roomId = typeof params.id === 'string' ? params.id : ''
  const { user } = useUserStore()

  const [roomInfo, setRoomInfo] = useState<SelectLiveCodingResDTO | null>(null)
  const { messages, sendMessage, isConnected } = useWebSocket(roomId)

  // 메모이제이션된 메시지 배열
  const memoizedMessages = useMemo(() => messages, [messages])

  const checkInvite = useCallback(
    (roomInfoRes: SelectLiveCodingResDTO) => {
      if (!user?.userNum) {
        alert('유효한 사용자가 아닙니다.')
        router.push('/')
        return
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
      checkInvite(roomInfoRes)
    } catch (e) {
      console.error('❌ 방 조회 실패:', e)
      router.push('/')
    }
  }, [roomId, checkInvite, router])

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
        <CodeEditor roomInfo={roomInfo} />
      </div>
      <Chat
        roomInfo={roomInfo}
        messages={memoizedMessages}
        sendMessage={sendMessage}
      />
    </div>
  )
}
