'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFindAccount } from '@/features/user/hooks/useFindAccount'
import { USER } from '#/generate'

const UserFindAccountForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const findAccountMutation = useFindAccount()

  const router = useRouter()
  const searchParams = useSearchParams()

  const [redirectPath, setRedirectPath] = useState('/')

  useEffect(() => {
    setRedirectPath(searchParams.get('redirect') || '/user/login')
  }, [searchParams])

  const handleFindAccount = () => {
    const findAccountReq: USER.FindAccountReqDTO = {
      email: email,
    }

    findAccountMutation.mutate(findAccountReq, {
      onSuccess: (res) => {
        console.log('res: ', res)
        setSuccessMessage(res.resultMessage ?? null)
        setTimeout(() => {
          router.replace(redirectPath)
        }, 2000)
      },
    })
  }

  return (
    <div className="w-full max-w-md">
      {/* 입력 필드 */}
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="이메일을 입력해주세요"
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.replace('/user/login')}
          className="p-3 px-6 rounded-md text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition active:opacity-80"
        >
          취소
        </button>

        <button
          onClick={handleFindAccount}
          disabled={!email}
          className="p-3 px-6 rounded-md text-white font-medium transition 
            bg-blue-600 hover:bg-blue-700 active:opacity-80 disabled:bg-gray-400 dark:disabled:bg-gray-700"
        >
          계정 찾기
        </button>
      </div>

      {/* 성공 메시지 */}
      {successMessage && (
        <p className="mt-4 text-green-500 text-sm">{successMessage}</p>
      )}
    </div>
  )
}

export default UserFindAccountForm
