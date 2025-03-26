import { create } from 'zustand'

interface AuthState {
  checkAuth: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>(() => ({
  checkAuth: async () => {
    try {
      const res = await fetch('/api/auth/check', {
        credentials: 'include',
        cache: 'no-store',
      })
      const data = await res.json()
      return data.isAuthenticated
    } catch (e) {
      console.error('checkAuth error:', e)
      return false
    }
  },
}))
