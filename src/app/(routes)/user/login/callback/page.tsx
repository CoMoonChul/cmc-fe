'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginGoogleNext } from '@/entities/user/api'
import useUserStore from '@/shared/store/useUserStore'

const GoogleLoginCompletePage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { setUser } = useUserStore()

  useEffect(() => {
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
    loginWithGoogle()
  }, [router, session, setUser])

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow p-8 flex flex-col items-center space-y-6">
        <div className="w-10 h-10 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>

        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          구글 로그인 진행 중...
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          잠시만 기다려주세요.
        </p>
      </div>
    </div>
  )
}

export default GoogleLoginCompletePage
