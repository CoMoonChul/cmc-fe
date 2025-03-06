'use client'
import './globals.css'
import QueryProvider from './provider'
import { useThemeStore } from '@/shared/store/useThemeStore'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { theme } = useThemeStore()

  return (
    <html lang="ko">
      <body className={theme}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
