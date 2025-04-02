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
            src="/logo.svg"
            alt="로고"
            width={24}
            height={24}
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
            className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-600 transition-all"
            onClick={() => router.push('/user/profile')}
          >
            <Image
              src="/default-profile.png"
              alt="프로필"
              width={32}
              height={32}
              className="object-cover"
            />
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
