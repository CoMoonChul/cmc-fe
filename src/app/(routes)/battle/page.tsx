'use client'

import React, { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { useComment } from '@/features/comment/hooks'
import Loading from '@/shared/ui/Loading'

export default function BattlePage() {
  const [commentId, setCommentId] = useState<number | null>(null)

  // 🔹 enabled: false → 초기 로딩 시 호출 안 함
  const { data, isFetching, refetch } = useComment(commentId ?? 1)

  const handleStartBattle = () => {
    setCommentId(3) // 원하는 ID 설정
    refetch() // 버튼 클릭 시 API 호출
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Battle Page</h1>
      {isFetching && <Loading />}

      {/* 배틀 시작 버튼 */}
      <Button label="배틀 시작" variant="primary" onClick={handleStartBattle} />

      {/* API 응답 결과 출력 */}
      {data && (
        <div className="mt-4 p-4 bg-white shadow-md rounded text-center">
          <p className="text-gray-800">{JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  )
}
