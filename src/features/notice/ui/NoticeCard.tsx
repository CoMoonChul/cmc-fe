'use client'

import { getFormattedCreatedAt } from '@/shared/lib/date'
import { FC } from 'react'

interface NoticeCardProps {
  notiId: number
  notiTitle: string
  reasonNoti: string
  createdAt: string
  notiType: string
  linkUrl?: string
  onDelete: (id: number | undefined) => void
  onAccept: (id: number | undefined, link: string | undefined) => void
}

const NoticeCard: FC<NoticeCardProps> = ({
  notiId,
  notiTitle,
  reasonNoti,
  createdAt,
  notiType,
  linkUrl,
  onDelete,
  onAccept,
}) => {
  return (
    <div className="relative w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
      <button
        style={{ top: '8px', right: '12px' }}
        className="absolute text-gray-400 hover:text-gray-600 text-sm"
        onClick={() => onDelete(notiId)}
      >
        ✕
      </button>

      <div className="flex flex-col gap-3">
        <p className="text-xs text-gray-400">
          {getFormattedCreatedAt(createdAt)}
        </p>

        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          {notiTitle}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 break-words">
          {reasonNoti}
        </p>

        {notiType === 'LINK' && (
          <button
            onClick={() => onAccept(notiId, linkUrl ?? '')}
            className="self-start mt-2 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
          >
            이동
          </button>
        )}

        {notiType === 'JOIN' && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onAccept(notiId, linkUrl ?? '')}
              className="flex-1 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
            >
              수락
            </button>
            <button
              onClick={() => onDelete(notiId)}
              className="flex-1 px-4 py-2 text-sm border border-blue-500 text-blue-500 bg-white hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition"
            >
              거절
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NoticeCard
