import { create } from 'zustand'

interface PopupState {
  isOpen: boolean
  title: string
  message: string
  onConfirm?: () => void
  openPopup: (title: string, message: string, onConfirm?: () => void) => void
  closePopup: () => void
}

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  title: '',
  message: '',
  onConfirm: undefined,
  openPopup: (title, message, onConfirm) =>
    set({ isOpen: true, title, message, onConfirm }),
  closePopup: () => set({ isOpen: false }),
}))
