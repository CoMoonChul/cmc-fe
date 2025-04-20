'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { checkUserId, joinGoogle, loginGoogleNext } from '@/entities/user/api'
import { USER } from '#/generate'
import { usePopupStore } from '@/shared/store/usePopupStore'
import useUserStore from '@/shared/store/useUserStore'

const GoogleAuthCallback = () => {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const flow = searchParams.get('flow')
  const router = useRouter()
  const { openPopup } = usePopupStore.getState()
  const { setUser } = useUserStore()

  const loginWithGoogle = async () => {
    if (session?.idToken) {
      const resLogin = await loginGoogleNext(session.idToken)
      if (resLogin?.status === 200) {
        setUser({
          userNum: resLogin?.userNum,
        })
        router.replace('/')
      } else {
        console.error('구글 로그인 JWT 발급 실패')
        router.replace('/user/login')
      }
    }
  }

  useEffect(() => {
    const email = session?.user?.email
    if (!email) return

    const userId = `google_${email.split('@')[0]}`

    if (flow === 'login') {
      checkUserId(userId)
        .then((res) => {
          if (res.resultMessage?.includes('USER007')) {
            loginWithGoogle()
          } else {
            openPopup('', '존재하지 않는 회원입니다.')
            router.replace('/user/login')
          }
        })
        .catch(() => {
          openPopup('', '에러가 발생하였습니다.')
          router.replace('/user/login')
        })
    } else if (flow === 'signup') {
      const joinReq: USER.JoinGoogleReqDTO = {
        userId: userId,
        username: userId,
        email: email,
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
  }, [flow, openPopup, router, session])

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow p-8 flex flex-col items-center space-y-6">
        <div className="w-10 h-10 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>

        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {flow === 'login'
            ? '구글 로그인 진행 중...'
            : '구글 회원가입 진행 중...'}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          잠시만 기다려주세요.
        </p>
      </div>
    </div>
  )
}

export default GoogleAuthCallback
