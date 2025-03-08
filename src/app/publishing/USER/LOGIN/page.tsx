'use client'

import { useState } from 'react'
import Image from 'next/image'
import GoogleIcon from '#/public/google-icon.svg'

const UserLoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState<string | null>(null)

  const validateLogin = () => {
    // 임시 유효성 검사 (실제 API 연결 필요)
    if (!formData.username || !formData.password) {
      setError('아이디와 비밀번호를 입력해주세요.')
      return false
    }

    if (
      formData.username !== 'testuser' ||
      formData.password !== 'password123'
    ) {
      setError('아이디 혹은 비밀번호가 잘못되었습니다.')
      return false
    }

    setError(null)
    return true
  }

  const handleLogin = () => {
    if (validateLogin()) {
      alert('로그인 성공! 리뷰 리스트 페이지로 이동합니다.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-300 p-6">
      {/* 코문철 로고 */}
      <h1 className="text-3xl font-bold mb-2">코문철</h1>

      {/* 로그인 안내 텍스트 */}
      <p className="text-lg font-medium">코문철에 오신 것을 환영합니다.</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        코문철은 코드 리뷰를 위한 개발자 커뮤니티입니다.
      </p>

      {/* 구글 간편 로그인 */}
      <button className="w-full max-w-md flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-3 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition active:opacity-80">
        <Image src={GoogleIcon} alt="Google" />
        <span className="text-sm font-medium">구글 간편 로그인</span>
      </button>

      {/* 로그인 불가 사유 (오류 메시지) */}
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

      {/* 폼 입력 필드 */}
      <div className="w-full max-w-md mt-6 space-y-4">
        {[
          {
            label: '아이디',
            name: 'username',
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
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 border-gray-300"
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      {/* 로그인 버튼 */}
      <button
        onClick={handleLogin}
        disabled={!formData.username || !formData.password}
        className="w-full max-w-md mt-6 p-3 rounded-md text-white font-medium transition 
          bg-blue-600 hover:bg-blue-700 active:opacity-80 disabled:bg-gray-400 dark:disabled:bg-gray-700"
      >
        로그인
      </button>

      {/* 회원가입 & 계정 찾기 링크 */}
      <div className="flex justify-center items-center gap-2 mt-4 text-sm">
        <span>아직 회원이 아니신가요?</span>
        <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition">
          회원가입
        </button>
      </div>

      <div className="flex justify-center items-center gap-2 mt-2 text-sm">
        <span>계정 정보가 기억나지 않으신가요?</span>
        <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition">
          계정 찾기
        </button>
      </div>
    </div>
  )
}

export default UserLoginPage
