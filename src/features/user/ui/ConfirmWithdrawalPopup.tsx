'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ConfirmWithdrawalPopupProps {
  onConfirm: (password: string) => void
  onCancel: () => void
}

const ConfirmWithdrawalPopup = ({
  onConfirm,
  onCancel,
}: ConfirmWithdrawalPopupProps) => {
  const [password, setPassword] = useState('')

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={onCancel}
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
          정말로 탈퇴하시겠습니까?
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
          확인을 누르시면 탈퇴가 진행됩니다.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 bg-white dark:bg-gray-800 text-black dark:text-white"
        />

        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            취소
          </button>
          <button
            onClick={() => onConfirm(password)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            확인
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ConfirmWithdrawalPopup
