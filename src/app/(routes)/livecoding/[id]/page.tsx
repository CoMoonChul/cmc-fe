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
  const { user } = useUserStore() // user 정보 가져오기

  // 웹소켓 관련 상태 관리
  const { connect, disconnect, messages, sendMessage, isConnected } =
    useWebSocketStore()

  // 방 정보와 스니펫 상태
  const [roomInfo, setRoomInfo] = useState<SelectLiveCodingResDTO | null>(null)
  const [snippet, setSnippet] = useState<SelectLiveCodingSnippetResDTO | null>(
    null,
  )

  // 메모이제이션된 메시지 배열
  const memoizedMessages = useMemo(() => messages, [messages])

  // 유효성 검사 함수 (참여자가 올바른지, 방이 올바른지 확인)
  const checkValid = useCallback(
    (roomInfoRes: SelectLiveCodingResDTO) => {
      console.log('checkValid checkValid checkValid')
      if (!user?.userNum) {
        alert('유효한 사용자가 아닙니다.')
        router.push('/')
        return
      }

      if (user.userNum === roomInfoRes.hostId) {
        // 호스트일 경우 아무 작업도 하지 않음
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

  // 방 정보와 스니펫을 불러오는 함수
  const selectRoom = async () => {
    try {
      const roomInfoRes = await selectLiveCoding(roomId)
      setRoomInfo(roomInfoRes)
      checkValid(roomInfoRes) // 유효성 검사 호출

      const snippetData = await selectLiveCodingSnippet(roomInfoRes.hostId)
      setSnippet(snippetData)
    } catch (e) {
      console.error('❌ 방 조회 실패:', e)
      router.push('/')
    }
  }

  // 방 ID가 있을 때 방 정보 조회
  useEffect(() => {
    if (roomId) {
      connect(roomId) // 웹소켓 연결
      return () => disconnect() // 컴포넌트 언마운트 시 웹소켓 종료
    }
  }, [roomId, connect, disconnect])

  // 방 정보 조회 및 상태 업데이트
  useEffect(() => {
    if (user?.userNum) {
      selectRoom() // user 정보가 있을 때 방 정보 조회
    } else {
      console.log('userNum이 없으므로 방 정보 조회를 기다립니다.')
    }
  }, [roomId, user?.userNum]) // user 정보가 바뀔 때마다 호출

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
