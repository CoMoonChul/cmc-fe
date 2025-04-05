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

  return <p>초대 링크 확인 중...</p>
}

const SuspenseLiveCodingJoinPage = () => {
  return (
    <Suspense fallback={<p>초대 링크를 확인하는 중입니다...</p>}>
      <LiveCodingJoinPage />
    </Suspense>
  )
}

export default SuspenseLiveCodingJoinPage
