'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useThemeStore } from '@/shared/store/useThemeStore'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useAuth } from '@/shared/hook/useAuth'
import { useState, useEffect } from 'react'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null)

  const { toggleTheme } = useThemeStore()
  const checkAuth = useAuth()

  useEffect(() => {
    const check = async () => {
      const result = await checkAuth()
      setIsAuthed(result)
    }
    check()
  }, [checkAuth, pathname])

  return (
    <header className="w-full h-16 px-6 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-6">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2"
        >
          <Image
            src="https://cmc-public-bucket.s3.ap-northeast-2.amazonaws.com/logos/cmc_icon.png"
            alt="로고"
            width={36}
            height={36}
            className="object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            코문철
          </span>
        </button>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
          <button onClick={() => router.push('/')}>리뷰</button>
          <button onClick={() => router.push('/battle')}>배틀</button>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => router.push('/notice')}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-xl"
        >
          🔔
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          🌙
        </motion.button>

        {isAuthed === null ? null : isAuthed ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push('/user/profile')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="프로필 보기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-800 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
              />
            </svg>
          </motion.button>
        ) : (
          <>
            <button
              onClick={() => router.push('/user/login')}
              className="px-4 py-1.5 border border-gray-400 rounded-full text-sm bg-white dark:bg-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 transition"
            >
              로그인
            </button>
            <button
              onClick={() => router.push('/user/join')}
              className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  )
}
