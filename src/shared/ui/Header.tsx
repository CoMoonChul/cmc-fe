'use client'

import { useRouter } from 'next/navigation'
import { useThemeStore } from '@/shared/store/useThemeStore'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Header() {
  const router = useRouter()
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="w-full h-14 px-4 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-md transition-all">
      <div className="flex items-center gap-3">
        {/* 로고 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="text-lg font-bold text-gray-900 dark:text-gray-100"
          onClick={() => router.push('/')}
        >
          코문철
        </motion.button>
      </div>

      {/* ✅ 우측: 공유, 알림, 프로필 */}
      <div className="flex items-center gap-3">
        {[
          // 다크/라이트 테스트(임시)
          { icon: '공유', onClick: toggleTheme },
          { icon: '알림', onClick: () => router.push('/notice') },
        ].map(({ icon, onClick }, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.1 }}
            onClick={onClick}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 transition-all"
          >
            {icon}
          </motion.button>
        ))}

        {/* 프로필 이미지 */}
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
      </div>
    </header>
  )
}
