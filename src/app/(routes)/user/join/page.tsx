import { Suspense } from 'react'
import UserJoinForm from '@/features/user/ui/UserJoinForm'

export default function UserJoinPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-300 p-6">
      <h1 className="text-3xl font-bold mb-2">코문철</h1>
      <p className="text-lg font-medium">코문철 회원 가입을 환영합니다.</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        코문철은 코드 리뷰를 위한 개발자 커뮤니티입니다.
      </p>
      <Suspense>
        <UserJoinForm />
      </Suspense>
    </div>
  )
}
