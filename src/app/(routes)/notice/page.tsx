'use client'

import React, { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { useComment } from '@/features/comment/hooks'
import { useNotices } from '@/features/notice/hooks'
import { useEditor } from '@/features/editor/hooks'

export default function NoticePage() {
  const [commentId, setCommentId] = useState<number | null>(null)

  const { data, refetch } = useNotices(0, 10)
  console.log('Fetching notices with page:', 0, 'size:', 10)

  // const {data2, refetch2} = useEditor(1)
  const handleStartBattle = () => {
    setCommentId(3)
    refetch()
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Battle Page</h1>

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
