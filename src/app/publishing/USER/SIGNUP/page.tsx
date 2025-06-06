'use client'

import { useState } from 'react'
import Image from 'next/image'
import GoogleIcon from '#/public/google-icon.svg'

const UserSignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    nickname: '',
  })

  const [errors, setErrors] = useState<Record<string, string | null>>({
    username: null,
    password: null,
    confirmPassword: null,
    email: null,
    nickname: null,
  })

  const validateForm = () => {
    const newErrors: Record<string, string | null> = {}

    if (formData.username.length < 4 || formData.username.length > 15) {
      newErrors.username = '아이디는 4~15자로 입력해주세요.'
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

    if (formData.nickname.length > 20) {
      newErrors.nickname = '닉네임은 20자 이하로 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => !error)
  }

  const handleSignup = () => {
    if (validateForm()) {
      alert('회원가입 성공! 로그인 페이지로 이동합니다.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-300 p-6">
      {/* 코문철 로고 */}
      <h1 className="text-3xl font-bold mb-2">코문철</h1>

      {/* 회원가입 안내 텍스트 */}
      <p className="text-lg font-medium">코문철 회원 가입을 환영합니다.</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        코문철은 코드 리뷰를 위한 개발자 커뮤니티입니다.
      </p>

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
            name: 'username',
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
            name: 'nickname',
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
        onClick={handleSignup}
        disabled={Object.values(formData).some((val) => !val)}
        className="w-full max-w-md mt-6 p-3 rounded-md text-white font-medium transition 
          bg-blue-600 hover:bg-blue-700 active:opacity-80 disabled:bg-gray-400 dark:disabled:bg-gray-700"
      >
        회원가입
      </button>

      {/* 로그인 링크 */}
      <div className="flex justify-center items-center gap-2 mt-4 text-sm">
        <span>이미 회원이신가요?</span>
        <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition">
          로그인
        </button>
      </div>
    </div>
  )
}

export default UserSignupPage
