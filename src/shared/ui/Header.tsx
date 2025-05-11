'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { motion } from 'framer-motion'
import { useAuth } from '@/shared/hook/useAuth'
import { useState, useEffect } from 'react'
import IconNotification from '@/shared/ui/IconNotification'
import IconTheme from './IconTheme'
import { usePopupStore } from '@/shared/store/usePopupStore'
import StartLiveModal from '@/features/livecoding/ui/StartLiveModal'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null)
  const { openPopup } = usePopupStore.getState()
  const [openLiveModal, setOpenLiveModal] = useState<boolean>(false)

  const { toggleTheme } = useThemeStore()
  const checkAuth = useAuth()

  const goLogin = () => {
    router.push('/user/login')
  }

  const onClickStartLive = async () => {
    const isLogin = await checkAuth()
    if (!isLogin) {
      openPopup(
        '로그인 후에 코드 리뷰를 시작할 수 있습니다.',
        '로그인 하시겠습니까?',
        goLogin,
      )
      return
    }
    setOpenLiveModal(true)
  }

  useEffect(() => {
    const check = async () => {
      const result = await checkAuth()
      setIsAuthed(result)
    }
    check()
  }, [checkAuth, pathname])

  return (
    <header className="min-w-[280px] w-full px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex flex-row flex-wrap items-center justify-between gap-2 sm:flex-col sm:items-start sm:gap-4">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <button
            onClick={() => router.push('/')}
            className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap"
          >
            코문철
          </button>
          <nav className="flex gap-3 text-sm sm:text-sm font-medium text-gray-800 dark:text-gray-200">
            <button onClick={() => router.push('/')}>리뷰</button>
            <button onClick={() => router.push('/battle')}>배틀</button>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-end">
          <button
            onClick={onClickStartLive}
            className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded whitespace-nowrap flex items-center justify-center"
          >
            코드 리뷰 시작
          </button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push('/notice')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <IconNotification className="w-6 h-6 sm:w-5 sm:h-5 text-gray-900 dark:text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={toggleTheme}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <IconTheme className="w-6 h-6 sm:w-5 sm:h-5 text-gray-900 dark:text-white" />
          </motion.button>

          {isAuthed === null ? null : isAuthed ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => router.push('/user/profile')}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="프로필 보기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 sm:w-5 sm:h-5 text-gray-800 dark:text-gray-100"
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
                className="px-3 py-1 text-xs sm:text-sm border border-gray-400 rounded-full bg-white dark:bg-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 transition"
              >
                로그인
              </button>
              <button
                onClick={() => router.push('/user/join')}
                className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs sm:text-sm hover:bg-blue-600 transition"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>

      {openLiveModal && (
        <StartLiveModal onClose={() => setOpenLiveModal(false)} />
      )}
    </header>
  )
}
