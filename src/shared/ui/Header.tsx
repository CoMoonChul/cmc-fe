'use client'

import { useRouter } from 'next/navigation'
import { useThemeStore } from '@/shared/store/useThemeStore'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Header() {
  const router = useRouter()
  const { toggleTheme } = useThemeStore()

  return (
    <header className="w-full h-16 px-6 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* 좌측: 로고 + 메뉴 */}
      <div className="flex items-center gap-6">
        {/* 로고 */}
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

        {/* 메뉴 */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
          <button onClick={() => router.push('/')}>리뷰</button>
          <button onClick={() => router.push('/battle')}>배틀</button>
        </nav>
      </div>

      {/* 우측: 기능 버튼들 */}
      <div className="flex items-center gap-3">
        {/* 다크모드 토글 */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          🌙
        </motion.button>

        {/* 로그인 / 회원가입 */}
        <button
          onClick={() => router.push('/user/login')}
          className="px-4 py-1.5 border border-gray-400 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          로그인
        </button>
        <button
          onClick={() => router.push('/user/join')}
          className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
        >
          회원가입
        </button>
      </div>
    </header>
  )
}
