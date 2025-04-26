import { create } from 'zustand'

interface LoadingState {
  isManualShow: boolean
  showLoading: (value: boolean) => void
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isManualShow: false,
  showLoading: (value) => set({ isManualShow: value }),
}))
