'use client'

import React, { useEffect, useState } from 'react'
import {
  useDeleteNoticeAllMutation,
  useDeleteNoticeMutation,
  useNotices,
} from '@/features/notice/hooks'
import NoticeCard from '@/features/notice/ui/NoticeCard'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'

const NoticePage = () => {
  const { mutate: deleteNotice } = useDeleteNoticeMutation()
  const { mutate: deleteNoticeAll } = useDeleteNoticeAllMutation()
  const router = useRouter()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useNotices(
    0,
    2,
  )
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

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
        {
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            전체삭제
          </button>
        }
      </div>

      <div className="space-y-4">
        {data?.pages.map((page) =>
          page.notiList?.map((notification, index) => (
            <NoticeCard
              key={index}
              {...notification}
              onDelete={handleDelete}
              onAccept={handleAccept}
            />
          )),
        )}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          {isFetchingNextPage ? (
            <span>로딩 중...</span>
          ) : (
            <span>더 불러오려면 스크롤하세요.</span>
          )}
        </div>
      )}
    </div>
  )
}

export default NoticePage
