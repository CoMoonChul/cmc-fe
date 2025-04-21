'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { verifyLiveCoding } from '@/entities/livecoding/api'

const LiveCodingJoinPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  useEffect(() => {
    if (!token) {
      alert('❌ 유효한 초대 링크가 아닙니다.')
      router.push('/')
      return
    }

    const checkRoomVerification = async () => {
      try {
        const res = await verifyLiveCoding(token)
        const verifyRoomId = res?.roomId || ''
        router.replace(`/livecoding/${verifyRoomId}`)
      } catch (e) {
        console.log(e)
        router.push('/')
      }
    }

    checkRoomVerification()
  }, [token, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4" />
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
        초대 링크 확인 중...
      </p>
    </div>
  )
}

const SuspenseLiveCodingJoinPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            초대 링크를 확인하는 중입니다...
          </p>
        </div>
      }
    >
      <LiveCodingJoinPage />
    </Suspense>
  )
}

export default SuspenseLiveCodingJoinPage
