'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface ProfileImageSelectorModalProps {
  onClose: () => void
  onSelect: (imageUrl: string) => void
}

const ProfileImageSelectorModal = ({
  onClose,
  onSelect,
}: ProfileImageSelectorModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const profileImageUrls = Array.from(
    { length: 12 },
    (_, i) =>
      `https://cmc-public-bucket.s3.ap-northeast-2.amazonaws.com/profiles/animal_profile_${i + 1}.png`,
  )

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[90vw] max-w-4xl shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-center mb-4 text-gray-800 dark:text-white">
          프로필 이미지 선택
        </h2>

        <div
          className="flex-1 overflow-y-auto grid grid-cols-3 gap-4 pr-2"
          style={{ maxHeight: '60vh' }}
        >
          {profileImageUrls.map((url, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelect(url)
                onClose()
              }}
              className="rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 hover:ring-2 hover:ring-blue-500 transition w-20 h-20 mx-auto"
            >
              <Image
                src={url}
                alt={`프로필 ${idx + 1}`}
                width={80}
                height={80}
                className="object-cover rounded-full"
              />
            </button>
          ))}
        </div>

        <button
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded self-end"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  )
}

export default ProfileImageSelectorModal
