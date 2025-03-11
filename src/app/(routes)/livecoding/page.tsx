'use client'

import { useState } from 'react'

import { LIVECODING } from '#/generate'
import { createLiveCoding } from '@/entities/livecoding/api' // OpenAPI에서 생성된 타입 가져오기

export default function LiveCodingTestPage() {
  const [hostId, setHostId] = useState<string>('') // 기본 테스트용 hostId (문자열로 설정)
  const [roomId, setRoomId] = useState<string | null>(null)

  const handleCreateRoom = async () => {
    try {
      const req: LIVECODING.CreateLiveCodingReqDTO = { hostId: Number(hostId) } // 숫자로 변환 후 요청 DTO 생성
      const response = await createLiveCoding(req) // API 호출
      setRoomId(response.roomId) // 방 ID 저장
      console.log('✅ 생성된 방 ID:', response.roomId)
    } catch (error) {
      console.error('❌ 방 생성 실패:', error)
    }
  }

  // 숫자만 입력 가능하게 처리하는 함수
  const handleHostIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // 숫자만 입력되도록 필터링
    if (/^\d*$/.test(value)) {
      setHostId(value)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">LiveCoding 생성 테스트</h1>
      <input
        type="text" // 숫자만 입력하도록 하지만 텍스트로 처리
        value={hostId}
        onChange={handleHostIdChange} // 변경 시 숫자만 입력
        className="border p-2 mb-4"
        placeholder="호스트 ID 입력"
      />
      <button
        onClick={handleCreateRoom}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        라이브코딩 방 생성
      </button>
      {roomId && (
        <p className="mt-4 text-green-600">✅ 생성된 방 ID: {roomId}</p>
      )}
    </div>
  )
}
