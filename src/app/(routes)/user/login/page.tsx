import { Suspense } from 'react'
import UserLoginForm from '@/features/user/ui/UserLoginForm'
import Image from 'next/image'
import { LOGO_PATH } from '@/shared/lib/constants'

export default function UserLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-300 p-6">
      <Image
        src={LOGO_PATH}
        alt="로고"
        width={72}
        height={72}
        className="object-contain mb-4"
      />
      <p className="text-lg font-medium">환영합니다!</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        코문철은 코드 리뷰를 위한 개발자 커뮤니티입니다.
      </p>
      <Suspense>
        <UserLoginForm />
      </Suspense>
    </div>
  )
}
