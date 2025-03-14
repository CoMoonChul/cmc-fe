'use client'

import React, { useState } from 'react'
import {
  useDeleteNoticeAllMutation,
  useDeleteNoticeMutation,
  useNotices,
} from '@/features/notice/hooks'
import NoticeCard from '@/features/notice/ui/NoticeCard'
import { useRouter } from 'next/navigation'
import { SelectNoticeListDTO, SelectNoticeResDTO } from '#/generate/notice/api'
import { UseQueryResult } from '@tanstack/react-query'

interface Notification {
  notiList: []
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
}

export default function NoticePage() {
  // const { notifications, setNotifications } = useState<Notification[]>()
  // const { data, refetch }: { Notification: Notification } = useNotices(0, 10)
  const { mutate: deleteNotice } = useDeleteNoticeMutation()
  const { mutate: deleteNoticeAll } = useDeleteNoticeAllMutation()
  const router = useRouter()
  const { data, refetch }: UseQueryResult<SelectNoticeListDTO, Error> =
    useNotices(0, 10)

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

  const handleDeleteAll = () => {
    console.log('알림 전체 삭제')
    deleteNoticeAll()
  }

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">알림함</h1>
      <div className="flex justify-between mb-4">
        <p className="text-gray-500">총 {data?.totalElements || 0}개의 알림</p>
        {data?.notiList?.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            전체삭제
          </button>
        )}
      </div>

      <div className="space-y-4">
        {data?.notiList?.length > 0 ? (
          data.notiList.map((notification: SelectNoticeResDTO) => (
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
