import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean | null
  setAuthenticated: (value: boolean) => void
  checkAuth: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  checkAuth: async () => {
    try {
      const res = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      })
      const data = await res.json()
      set({ isAuthenticated: data.isAuthenticated })
      return data.isAuthenticated
    } catch (e) {
      console.error('checkAuth error:', e)
      set({ isAuthenticated: false })
      return false
    }
  },
}))
