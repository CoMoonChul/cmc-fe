'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useThemeStore } from '@/shared/store/useThemeStore'

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-300">
      <header className="w-full bg-white dark:bg-[#2A2A2A] shadow-md p-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg transition 
          bg-gray-200 text-gray-900 hover:bg-gray-300 
          dark:bg-[#3A3A3A] dark:text-gray-100 dark:hover:bg-[#444444]"
        >
          ← 뒤로 가기
        </button>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {pathname}
        </span>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg transition 
          bg-gray-200 text-gray-900 hover:bg-gray-300 
          dark:bg-[#3A3A3A] dark:text-gray-100 dark:hover:bg-[#444444]"
        >
          {theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
        </button>
      </header>

      <main className="flex-grow p-6">{children}</main>
    </div>
  )
}

export default Layout
