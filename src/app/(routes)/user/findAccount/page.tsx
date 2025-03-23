import { Suspense } from 'react'
import UserFindAccountForm from '@/features/user/ui/UserFindAccountForm'

export default function UserFindAccountPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-300 p-6">
      <h1 className="text-3xl font-bold mb-2">코문철</h1>
      <p className="text-lg font-medium">계정 찾기</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        회원 가입 시 입력하신 이메일 주소를 입력하시면, 계정 정보 변경 링크를
        보내드립니다.
      </p>
      <Suspense>
        <UserFindAccountForm />
      </Suspense>
    </div>
  )
}
