import { create } from 'zustand'

interface User {
  userNum: number | null
}

interface UserStore {
  user: User
  setUser: (user: User) => void
  clearUser: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: {
    userNum: null,
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: { userNum: null } }),
}))

export default useUserStore
