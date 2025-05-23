'use client'

import { usePopupStore } from '@/shared/store/usePopupStore'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

interface PopupData {
  id: string
  title?: string
  message?: string
  onConfirm?: () => void
}

const PopupItem = ({ popup, index }: { popup: PopupData; index: number }) => {
  const { closePopup } = usePopupStore()
  const confirmButtonRef = useRef<HTMLButtonElement>(null)
  const singleButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (popup.onConfirm && confirmButtonRef.current) {
      confirmButtonRef.current.focus()
    } else if (!popup.onConfirm && singleButtonRef.current) {
      singleButtonRef.current.focus()
    }
  }, [popup.onConfirm])

  return (
    <div
      key={popup.id}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={() => closePopup(popup.id)}
      style={{ zIndex: 1000 + index }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-[90%] max-w-md text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {popup.title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
          {popup.message}
        </p>

        <div className="flex justify-center gap-3 mt-4">
          {popup.onConfirm ? (
            <>
              <button
                onClick={() => closePopup(popup.id)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                닫기
              </button>
              <button
                ref={confirmButtonRef}
                onClick={() => {
                  popup.onConfirm?.()
                  closePopup(popup.id)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                확인
              </button>
            </>
          ) : (
            <button
              ref={singleButtonRef}
              onClick={() => closePopup(popup.id)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              확인
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

const CommonPopup = () => {
  const { popups } = usePopupStore()

  return (
    <>
      {popups.map((popup, index) => (
        <PopupItem key={popup.id} popup={popup} index={index} />
      ))}
    </>
  )
}

export default dynamic(() => Promise.resolve(CommonPopup), { ssr: false })
