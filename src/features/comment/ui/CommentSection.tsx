'use client'
import { useState, useEffect } from 'react'
import { getFormattedCreatedAt } from '@/shared/lib/date'
import { useInView } from 'react-intersection-observer'
import { useCommentListInfiniteQuery } from '@/features/comment/hooks/useCommentListInfiniteQuery'
import { useCreateCommentQuery } from '@/features/comment/hooks/useCreateCommentQuery'
import { useDeleteCommentMutation } from '../hooks/useDeleteCommentMutation'
import { COMMENT } from '#/generate'
import Image from 'next/image'
import useUserStore from '@/shared/store/useUserStore'

interface CommentSectionProps {
  id: number
  commentTarget: number
}

const CommentSection: React.FC<CommentSectionProps> = ({
  id,
  commentTarget,
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useCommentListInfiniteQuery(id, commentTarget, 10)
  const deleteCommentMutation = useDeleteCommentMutation(id, commentTarget, 10)
  const createCommentMutation = useCreateCommentQuery(id, commentTarget, 10)
  const [comment, setComment] = useState('')
  const { ref, inView } = useInView()
  const { user } = useUserStore()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const handleSubmit = async () => {
    if (!comment.trim()) {
      return
    }

    const createReq: COMMENT.CreateCommentReqDTO = {
      content: comment.trim(),
      targetId: id,
      commentTarget: commentTarget,
    }

    createCommentMutation.mutate(createReq, {
      onSuccess: () => {
        setComment('')
      },
    })
  }

  const handleDelete = (commentId: number) => {
    const deleteReq: COMMENT.DeleteCommentReqDTO = {
      commentId: commentId,
    }

    deleteCommentMutation.mutate(deleteReq)
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        댓글
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="flex items-center space-x-2 mb-6"
      >
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 작성해 보세요"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          등록
        </button>
      </form>

      {isLoading ? (
        <p className="text-gray-500 dark:text-gray-400">로딩 중</p>
      ) : data?.pages?.length ? (
        <ul className="space-y-4">
          {data.pages.map((page) =>
            page.commentList.map(
              ({
                commentId,
                username,
                content,
                createdAt,
                userImg,
                userNum,
              }) => {
                const isMyComment = userNum === user?.userNum
                return (
                  <li
                    key={commentId}
                    className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                  >
                    {isMyComment && (
                      <button
                        onClick={() => handleDelete(commentId)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-sm"
                      >
                        ✕
                      </button>
                    )}

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={userImg}
                          alt={'프로필 사진'}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {username}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {getFormattedCreatedAt(createdAt)}
                          </p>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 break-words">
                          {content}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              },
            ),
          )}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          첫 댓글을 남겨보세요!
        </p>
      )}

      <div className="mt-6 flex justify-center">
        {isFetchingNextPage && (
          <p className="text-gray-500 dark:text-gray-400">댓글 불러오는 중</p>
        )}
      </div>

      {!hasNextPage && (data?.pages?.length ?? 0) > 0 && (
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
          더 이상 댓글이 없습니다.
        </p>
      )}

      <div ref={ref} className="h-1" />
    </div>
  )
}

export default CommentSection
