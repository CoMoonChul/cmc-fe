'use client'

import React, { useEffect } from 'react'
import NoticeCard from '@/features/notice/ui/NoticeCard'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import { useNoticeListInfiniteQuery } from '@/features/notice/hooks/useNoticeListInfiniteQuery'
import { useDeleteNoticeQuery } from '@/features/notice/hooks/useDeleteNoticeQuery'
import { useDeleteNoticeAllQuery } from '@/features/notice/hooks/useDeleteNoticeAllQuery'

const NoticePage = () => {
  const { mutate: deleteNotice } = useDeleteNoticeQuery()
  const { mutate: deleteNoticeAll } = useDeleteNoticeAllQuery()
  const router = useRouter()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNoticeListInfiniteQuery(0, 9)
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
  const handleDelete = (id: number | undefined) => {
    deleteNotice({ notiId: id }) // 요청 실행
  }

  const handleAccept = (id: number | undefined, link: string = '') => {
    router.push(link)
    handleDelete(id)
  }

  const handleDeleteAll = () => {
    deleteNoticeAll()
  }

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">알림함</h1>
        {(data?.pages?.[0]?.totalElements ?? 0) > 0 && (
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            전체삭제
          </button>
        )}
      </div>

      <div className="space-y-4">
        {(data?.pages?.[0]?.notiList?.length ?? 0) > 0 ? (
          data?.pages.map((page) =>
            page.notiList?.map((notification, index) => (
              <NoticeCard
                key={index}
                {...notification}
                onDelete={handleDelete}
                onAccept={handleAccept}
              />
            )),
          )
        ) : (
          <div className="text-center text-gray-500">알림이 없습니다.</div>
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
