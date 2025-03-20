import { create } from 'zustand'

interface Popup {
  id: string
  title: string
  message: string
  onConfirm?: () => void
}

interface PopupState {
  popups: Popup[]
  openPopup: (title: string, message: string, onConfirm?: () => void) => void
  closePopup: (id: string) => void
}

export const usePopupStore = create<PopupState>((set) => ({
  popups: [],
  openPopup: (title, message, onConfirm) =>
    set((state) => {
      const newPopup: Popup = {
        id: crypto.randomUUID(),
        title,
        message,
        onConfirm,
      }
      return { popups: [...state.popups, newPopup] }
    }),
  closePopup: (id) =>
    set((state) => ({
      popups: state.popups.filter((popup) => popup.id !== id),
    })),
}))
