'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { joinGoogle } from '@/entities/user/api'
import { USER } from '#/generate'
import { usePopupStore } from '@/shared/store/usePopupStore'

const GoogleJoinCallback = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { openPopup } = usePopupStore.getState()

  useEffect(() => {
    if (session?.user?.email && session?.user?.name) {
      const googleUserId = `google_${session.user.email.split('@')[0]}`

      const joinReq: USER.JoinGoogleReqDTO = {
        userId: googleUserId,
        username: googleUserId,
        email: session.user.email,
        profileImg: '',
      }

      joinGoogle(joinReq)
        .then(() => {
          router.replace('/user/login')
          openPopup(
            '',
            '회원가입에 성공하였습니다. 구글 간편 로그인으로 로그인해 주세요.',
          )
        })
        .catch((err) => {
          console.error('구글 회원가입 실패', err)
          router.replace('/user/login')
        })
    }
  }, [openPopup, router, session])

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow p-8 flex flex-col items-center space-y-6">
        <div className="w-10 h-10 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>

        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          구글 회원가입 진행 중...
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          잠시만 기다려주세요.
        </p>
      </div>
    </div>
  )
}

export default GoogleJoinCallback
