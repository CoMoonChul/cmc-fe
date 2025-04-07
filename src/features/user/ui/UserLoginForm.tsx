'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useUserStore from '@/shared/store/useUserStore'
import Image from 'next/image'
import GoogleIcon from '#/public/google-icon.svg'
import { loginNext } from '@/entities/user/api'

const UserLoginForm = () => {
  // routing
  const router = useRouter()
  const searchParams = useSearchParams()

  const { setUser } = useUserStore()

  // state
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  })
  const [redirectPath, setRedirectPath] = useState('/')
  const [error, setError] = useState<string | null>(null)

  // effect
  useEffect(() => {
    setRedirectPath(searchParams.get('redirect') || '/')
  }, [searchParams])

  // handler
  const handleLogin = async () => {
    if (!formData.userId || !formData.password) {
      setError('아이디와 비밀번호를 입력해주세요.')
      return
    }

    const resLogin = await loginNext(formData.userId, formData.password)
    if (resLogin?.status === 200) {
      setUser({
        userNum: resLogin?.userNum,
      })
      router.replace(redirectPath)
    } else {
      if (resLogin?.message && typeof resLogin?.message === 'string') {
        setError(resLogin.message)
      } else {
        setError('로그인 실패했어요. 잠시 후 다시 시도해 주세요.')
      }
    }
  }

  return (
    <div className="w-full max-w-md">
      <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-3 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition active:opacity-80">
        <Image src={GoogleIcon} alt="Google" />
        <span className="text-sm font-medium">구글 간편 로그인</span>
      </button>

      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

      <div className="mt-6 space-y-4">
        {[
          {
            label: '아이디',
            name: 'userId',
            placeholder: '아이디를 입력해주세요',
          },
          {
            label: '비밀번호',
            name: 'password',
            placeholder: '비밀번호를 입력해주세요',
            type: 'password',
          },
        ].map(({ label, name, placeholder, type = 'text' }) => (
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type={type}
              value={formData[name as keyof typeof formData]}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin()
                }
              }}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 border-gray-300"
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleLogin}
        disabled={!formData.userId || !formData.password}
        className="w-full mt-6 p-3 rounded-md text-white font-medium transition 
          bg-blue-600 hover:bg-blue-700 active:opacity-80 disabled:bg-gray-400 dark:disabled:bg-gray-700"
      >
        로그인
      </button>

      <div className="flex justify-center items-center gap-2 mt-4 text-sm">
        <span>아직 회원이 아니신가요?</span>
        <button
          onClick={() => router.replace('/user/join')}
          className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
        >
          회원가입
        </button>
      </div>

      <div className="flex justify-center items-center gap-2 mt-2 text-sm">
        <span>계정 정보가 기억나지 않으신가요?</span>
        <button
          onClick={() => router.replace('/user/findAccount')}
          className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
        >
          계정 찾기
        </button>
      </div>
    </div>
  )
}

export default UserLoginForm
