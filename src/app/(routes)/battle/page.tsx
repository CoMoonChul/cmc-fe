'use client'

import React, { useState } from 'react'
import { selectComment } from '@/entities/comment/api'
import { Button } from '@/shared/components/ui/Button'

export default function BattlePage() {
  const [selectResult, setSelectResult] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleStartBattle = async () => {
    setLoading(true)
    try {
      const result = await selectComment(3)
      setSelectResult(JSON.stringify(result.data))
    } catch (error) {
      setSelectResult(JSON.stringify(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Battle Page</h1>

      {/* 배틀 시작 버튼 */}
      <Button label="배틀 시작" variant="primary" onClick={handleStartBattle} />

      {/* 로딩 상태 표시 */}
      {loading && <p className="mt-4 text-gray-600">배틀 진행 중...</p>}

      {/* API 응답 결과 출력 */}
      {selectResult && (
        <div className="mt-4 p-4 bg-white shadow-md rounded text-center">
          <p className="text-gray-800">{selectResult}</p>
        </div>
      )}
    </div>
  )
}
