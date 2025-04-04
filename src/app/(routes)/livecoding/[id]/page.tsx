'use client'

import { useParams } from 'next/navigation'
import CodeEditor from '@/features/livecoding/ui/CodeEditor'
import Chat from '@/features/livecoding/ui/Chat'
import { selectLiveCoding } from '@/entities/livecoding/api'
import { useEffect, useState } from 'react'
import { SelectLiveCodingResDTO } from '#/generate/livecoding/api'
import useUserStore from '@/shared/store/useUserStore'


export default function LiveCodingPage() {
  const params = useParams()
  const roomId = typeof params.id === "string" ? params.id : ""
  const { user } = useUserStore()

  const [roomInfo, setRoomInfo] = useState<SelectLiveCodingResDTO | null>(null)


  const selectRoom = async () => {
    try {
      const roomInfoRes = await selectLiveCoding(roomId)
      setRoomInfo(roomInfoRes) // roomInfo 업데이트
      checkInvite(roomInfoRes)
    } catch (e) {
      console.error("❌ 방 조회 실패:", e)
    }
  }

  const checkInvite = (roomInfoRes: SelectLiveCodingResDTO) => {

    if (!user?.userNum) {
      alert('유효한 사용자가 아닙니다.')
      return
    }

    console.log('checkInvite>>>>>>>>>>>>>>>>>>>>>>>');
    const participants = roomInfoRes.participants
    console.log('participants');
    console.log(participants);
    if (participants.length >= 3 ) {

      alert('참여인원 초과')
    }
    if (!participants.includes(user.userNum)){
      alert('초대 x ')
    }

  }
  
  useEffect(() => {
    if (!user?.userNum) {
      console.log('userNum이 없으므로 방 정보 조회를 기다립니다.')
      return
    }
    selectRoom() // 한 번만 호출되도록 조정
  }, [user?.userNum])
  

  return (
    <div className="flex h-screen">
      {/* 코드 편집기 */}
      <div className="flex-1">
        <CodeEditor roomInfo={roomInfo} />
      </div>

      {/* 채팅 영역 (웹소켓 메시지와 전송 함수 전달) */}
      <Chat roomInfo={roomInfo} />
    </div>
  )
}
