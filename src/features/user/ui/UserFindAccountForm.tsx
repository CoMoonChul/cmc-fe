'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFindAccountMutation } from '@/features/user/hooks/useFindAccountMutation'
import { USER } from '#/generate'
import { getErrorMessage } from '@/shared/lib/messages'
import { usePopupStore } from '@/shared/store/usePopupStore'

const UserFindAccountForm = () => {
  const [email, setEmail] = useState('')
  const findAccountMutation = useFindAccountMutation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { openPopup } = usePopupStore.getState()

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
        const parsedMessage = getErrorMessage(res.resultMessage ?? '')
        openPopup('', parsedMessage, () => router.replace(redirectPath))
      },
    })
  }

  return (
    <div className="w-full max-w-md">
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 'border-gray-300"
            placeholder="이메일을 입력해주세요"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFindAccount()
              }
            }}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.replace(redirectPath)}
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
    </div>
  )
}

export default UserFindAccountForm
