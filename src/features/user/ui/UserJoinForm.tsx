'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useJoin } from '@/features/user/hooks/useJoin'
import { USER } from '#/generate'

import Image from 'next/image'
import GoogleIcon from '#/public/google-icon.svg'

const UserJoinForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    username: '',
    email: '',
  })

  const [errors, setErrors] = useState<Record<string, string | null>>({
    userId: '',
    password: '',
    confirmPassword: '',
    username: '',
    email: '',
  })

  const joinMutation = useJoin()

  const router = useRouter()
  const searchParams = useSearchParams()

  const [redirectPath, setRedirectPath] = useState('/')

  useEffect(() => {
    setRedirectPath(searchParams.get('redirect') || '/user/login')
  }, [searchParams])

  const validateForm = () => {
    const newErrors: Record<string, string | null> = {}

    if (formData.userId.length < 4 || formData.userId.length > 15) {
      newErrors.userId = '아이디는 4~15자로 입력해주세요.'
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(formData.password)) {
      newErrors.password =
        '비밀번호는 최소 6자 이상 (알파벳, 숫자 필수) 입력해주세요.'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.'
    }

    if (formData.username.length > 20) {
      newErrors.username = '닉네임은 20자 이하로 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => !error)
  }

  const handleJoin = () => {
    console.log('??@!?#@!?')
    if (validateForm()) {
      const joinReq: USER.JoinReqDTO = {
        userId: formData.userId,
        password: formData.password,
        username: formData.username,
        email: formData.email,
      }

      joinMutation.mutate(joinReq, {
        onSuccess: (res) => {
          console.log('res: ', res)
          router.replace(redirectPath)
        },
      })
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* 구글 간편 가입 */}
      <button className="w-full max-w-md flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-3 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition active:opacity-80">
        <Image src={GoogleIcon} alt="Google" />
        <span className="text-sm font-medium">구글 간편 회원가입</span>
      </button>

      {/* 폼 입력 필드 */}
      <div className="w-full max-w-md mt-6 space-y-4">
        {[
          {
            label: '아이디',
            name: 'userId',
            placeholder: '4~15자 이내로 입력해주세요',
          },
          {
            label: '비밀번호',
            name: 'password',
            placeholder: '최소 6자 이상(알파벳, 숫자 필수)',
            type: 'password',
          },
          {
            label: '비밀번호 확인',
            name: 'confirmPassword',
            placeholder: '비밀번호와 동일하게 입력해주세요',
            type: 'password',
          },
          {
            label: '이메일',
            name: 'email',
            placeholder: 'coding@cmc.kr',
            type: 'email',
          },
          {
            label: '닉네임',
            name: 'username',
            placeholder: '알파벳, 한글, 숫자를 20자 이하로 입력해주세요',
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
              className={`w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 ${
                errors[name] ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={placeholder}
            />
            {errors[name] && (
              <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>

      {/* 회원가입 버튼 */}
      <button
        onClick={handleJoin}
        disabled={Object.values(formData).some((val) => !val)}
        className="w-full max-w-md mt-6 p-3 rounded-md text-white font-medium transition 
          bg-blue-600 hover:bg-blue-700 active:opacity-80 disabled:bg-gray-400 dark:disabled:bg-gray-700"
      >
        회원가입
      </button>

      {/* 로그인 링크 */}
      <div className="flex justify-center items-center gap-2 mt-4 text-sm">
        <span>이미 회원이신가요?</span>
        <button
          onClick={() => router.replace('/user/login')}
          className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
        >
          로그인
        </button>
      </div>
    </div>
  )
}

export default UserJoinForm
