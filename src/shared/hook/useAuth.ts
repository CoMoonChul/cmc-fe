import { useEffect, useState } from 'react'
import { useAuthStore } from '@/shared/store/useAuthStore'

export const useAuth = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const result = await checkAuth()
      setIsAuthenticated(result)
    }
    fetch()
  }, [checkAuth])

  return isAuthenticated
}
