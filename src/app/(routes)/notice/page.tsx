'use client'

import React, { useState } from 'react'
import { useDeleteNoticeMutation, useNotices } from '@/features/notice/hooks'
import NoticeCard from '@/features/notice/ui/NoticeCard'
import { useRouter } from 'next/navigation'

interface NotificationItem {
  noti_id: number
  noti_type: string
  noti_title: string
  noti_content: string
  noti_link: string
  noti_created_at: string
  noti_read: boolean
  // 필요한 추가 필드들을 여기에 정의하세요.
}

interface Notification {
  notiList: NotificationItem[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
}

export default function NoticePage() {
  const { data, refetch, isLoading, isError } = useNotices(0, 10)
  const { mutate: deleteNotice } = useDeleteNoticeMutation()
  const router = useRouter()

  /**
   * 알림 삭제
   * @param id
   */
  const handleDelete = (id: number) => {
    console.log('알림 삭제 요청', id)
    deleteNotice({ noti_id: id }) // 요청 실행
  }

  const handleAccept = (id: number, link: string) => {
    console.log('컴포넌트 수락 클릭', link)
    router.push(link)
    handleDelete(id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
        Loading...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
        Error loading notices.
      </div>
    )
  }

  const notiList = data?.notiList || []

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">알림함</h1>

      <div className="space-y-4">
        {notiList.length > 0 ? (
          notiList.map((notification) => (
            <NoticeCard
              key={notification.noti_id}
              notification={notification}
              onDelete={handleDelete}
              onAccept={handleAccept}
            />
          ))
        ) : (
          <p className="text-gray-500">알림이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
