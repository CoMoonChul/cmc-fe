import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  userNum: number | null
}

interface UserStore {
  user: User
  setUser: (user: User) => void
  clearUser: () => void
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        userNum: null,
      },
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: { userNum: null } }),
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ user: state.user }),
    },
  ),
)

export default useUserStore
