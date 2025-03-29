'use client'

import useUserStore from '@/shared/store/useUserStore'
import { useState } from 'react'
import { LIVECODING } from '#/generate'
import { createLiveCoding, selectLiveCoding, deleteLiveCoding } from '@/entities/livecoding/api'
import { useRouter } from 'next/navigation'

export default function LiveCodingTestPage() {
  const [roomId, setRoomId] = useState<string | null>(null)
  const [roomInfo, setRoomInfo] = useState<LIVECODING.SelectLiveCodingResDTO | null>(null)
  const { user } = useUserStore()
  const router = useRouter() // next/router의 useRouter 훅 사용

  const createRoom = async () => {
    try {
      const req: LIVECODING.CreateLiveCodingReqDTO = {
        hostId: Number(user?.userNum),
      }
      const response = await createLiveCoding(req)
      setRoomId(response.roomId)
      console.log('✅ 생성된 방 ID:', response.roomId)

      // 방 생성 후 해당 roomId로 URL 변경
      router.push(`/livecoding/${response.roomId}`)
    } catch (error) {
      alert('방 ID 오류.')
      console.error('❌ 방 생성 실패:', error)
    }
  }

  const selectRoom = async () => {
    try {
      const inputRoomId = prompt('조회할 방 ID를 입력하세요.')
      if (!inputRoomId) {
        alert('방 ID를 입력해야 합니다.')
        return
      }
      const response = await selectLiveCoding(inputRoomId)
      setRoomInfo(response)
      console.log('✅ 조회된 방 정보:', response)
    } catch (error) {
      console.error('❌ 방 조회 실패:', error)
    }
  }

  const deleteRoom = async () => {
    try {
      const inputRoomId = prompt('삭제할 방 ID를 입력하세요.')
      if (!inputRoomId) {
        alert('방 ID를 입력해야 합니다.')
        return
      }

      const data: LIVECODING.DeleteLiveCodingReqDTO = {
        roomId: inputRoomId,
      }
      const response = await deleteLiveCoding(data)
      if (response) {
        alert('방이 성공적으로 삭제되었습니다.')
        setRoomId(null) // 삭제 후 방 ID 초기화
        setRoomInfo(null) // 방 정보 초기화
      } else {
        alert('방 삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('❌ 방 삭제 실패:', error)
      alert('방 삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">LiveCoding 테스트</h1>

      {/* 방 생성 버튼 */}
      <button
        onClick={createRoom}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
      >
        라이브코딩 방 생성
      </button>
      {roomId && (
        <p className="mt-2 text-green-600">✅ 생성된 방 ID: {roomId}</p>
      )}

      {/* 방 조회 버튼 */}
      <button
        onClick={selectRoom}
        className="px-4 py-2 bg-green-500 text-white rounded mt-4"
      >
        라이브코딩 방 조회
      </button>
      {roomInfo && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <p className="font-bold">방 정보:</p>
          <p>ID: {roomInfo.roomId}</p>
          <p>호스트 ID: {roomInfo.hostId}</p>
          <p>생성 시간: {roomInfo.createdAt}</p>
        </div>
      )}

      {/* 방 삭제 버튼 */}
      <button
        onClick={deleteRoom}
        className="px-4 py-2 bg-red-500 text-white rounded mt-4"
      >
        라이브코딩 방 삭제
      </button>
    </div>
  )
}
