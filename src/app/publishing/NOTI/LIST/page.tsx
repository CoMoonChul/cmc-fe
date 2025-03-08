'use client'

import { useState } from 'react'

interface Notification {
  id: number
  type: 'link' | 'approval' | 'default'
  title: string
  content: string
  createdAt: Date
  link?: string
}

const formatDate = (date: Date) => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 24) return `${diffHours}시간 전`
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const NotificationCard = ({
  notification,
  onDelete,
}: {
  notification: Notification
  onDelete: (id: number) => void
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2 relative">
      {/* 삭제 버튼 */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
        onClick={() => onDelete(notification.id)}
      >
        X
      </button>

      {/* 생성 날짜 */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {formatDate(notification.createdAt)}
      </p>

      {/* 알림 제목 */}
      <h3 className="font-semibold">{notification.title}</h3>

      {/* 알림 내용 */}
      {notification.type === 'link' ? (
        <a href={notification.link} className="text-blue-500 hover:underline">
          {notification.content}
        </a>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">
          {notification.content}
        </p>
      )}

      {/* 버튼 영역 */}
      {notification.type === 'link' && (
        <a
          href={notification.link}
          className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
        >
          이동
        </a>
      )}
      {notification.type === 'approval' && (
        <div className="flex gap-2 mt-2">
          <button className="flex-1 px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition">
            수락
          </button>
          <button
            onClick={() => onDelete(notification.id)}
            className="flex-1 px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
          >
            거절
          </button>
        </div>
      )}
    </div>
  )
}

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'link',
      title: '배틀 초대',
      content: '당신이 초대받은 배틀을 확인하세요!',
      createdAt: new Date(),
      link: '/battle/123',
    },
    {
      id: 2,
      type: 'approval',
      title: '그룹 가입 요청',
      content: 'CodeMasters 그룹에 가입 요청이 왔습니다.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    {
      id: 3,
      type: 'default',
      title: '새로운 공지사항',
      content: '사이트 업데이트가 진행됩니다.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30),
    },
  ])

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">알림함</h1>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default NotificationPage
