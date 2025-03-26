import { useAuthStore } from '@/shared/store/useAuthStore'

export const useAuth = () => {
  return useAuthStore((state) => state.checkAuth)
}
