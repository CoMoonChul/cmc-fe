'use client'

import { useThemeStore } from '@/shared/store/useThemeStore'
import Header from '@/shared/ui/Header'
import CommonPopup from '@/shared/ui/CommonPopup'
import QueryProvider from '@/app/provider'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useThemeStore()
  const pathname = usePathname()
  // 헤더 숨김 여부
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    const noHeaderPages = ['/user/login', '/user/join', '/user/findAccount']
    setShowHeader(!noHeaderPages.includes(pathname))
  }, [pathname])

  return (
    <body className={theme}>
      {showHeader && <Header />}
      <QueryProvider>{children}</QueryProvider>
      <CommonPopup />
    </body>
  )
}
