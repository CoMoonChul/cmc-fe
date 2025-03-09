'use client'

import { usePopupStore } from '@/shared/store/usePopupStore'

export default function CommonPopup() {
  const { isOpen, title, message, onConfirm, closePopup } = usePopupStore()

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => {
        closePopup()
      }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={closePopup}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 transition"
          >
            닫기
          </button>
          {onConfirm && (
            <button
              onClick={() => {
                onConfirm()
                closePopup()
              }}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
