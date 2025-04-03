'use client'

import { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { usePopupStore } from '@/shared/store/usePopupStore'
import { useForm, useFormState } from 'react-hook-form'
import { useReviewDetailQuery } from '../hooks/useReviewDetailQuery'
import { useCreateReviewQuery } from '../hooks/useCreateReviewQuery'
import { useUpdateReviewQuery } from '../hooks/useUpdateReviewQuery'
import { compressGzip, decompressGzip } from '@/features/editor/helper'
import { REVIEW } from '#/generate'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'

interface ReviewFormValues {
  title: string
  content: string
  codeContent: string
  codeType: string
}

const ReviewForm = ({ reviewId }: { reviewId?: string }) => {
  const router = useRouter()

  // 수정/등록 분기
  const isEditMode = !!reviewId
  const { openPopup } = usePopupStore.getState()
  const { register, handleSubmit, control, setValue, getValues } =
    useForm<ReviewFormValues>({
      defaultValues: {
        title: '',
        content: '',
        codeContent: '',
        codeType: 'javascript',
      },
    })

  const { pending } = useFormStatus()
  const [openModal, setOpenModal] = useState<null>(null)
  const { data } = useReviewDetailQuery(Number(reviewId), isEditMode)
  const createReviewMutation = useCreateReviewQuery()
  const updateReviewMutation = useUpdateReviewQuery(Number(reviewId))

  //  폼 초기화 처리
  useEffect(() => {
    if (data) {
      const deCompCodeContent = decompressGzip(data.codeContent)
      if (!deCompCodeContent) {
        throw new Error('코드 내용을 불러오는데 실패했습니다.')
      }

      setValue('title', data.title)
      setValue('content', data.content)
      setValue('codeContent', data.codeContent)
      setValue('codeType', data.codeType)
    }
  }, [data, setValue])

  const onSubmit = () => {
    if (!getValues('codeContent')) {
      openPopup('코드는 1~20000자 이내로 입력해 주세요.', '')
      return
    }

    const compCodeContent = compressGzip(getValues('codeContent'))

    if (!compCodeContent) {
      openPopup('코드 압축에 실패했습니다. 코드 내용을 확인하세요.', '')
      return
    }

    if (isEditMode) {
      const updateReq: REVIEW.UpdateReviewReqDTO = {
        reviewId: Number(reviewId),
        title: getValues('title'),
        content: getValues('content'),
        codeContent: getValues('codeContent'),
        codeType: getValues('codeType'),
      }

      updateReviewMutation.mutate(updateReq, {
        onSuccess(response) {
          // 수정 성공 시 수정한한 글 상세로 이동됨
          router.push(`review/detail/${response.reviewId}`)
        },
      })
    } else {
      const createReq: REVIEW.CreateReviewReqDTO = {
        title: getValues('title'),
        content: getValues('content'),
        codeContent: getValues('codeContent'),
        codeType: getValues('codeType'),
      }

      createReviewMutation.mutate(createReq, {
        onSuccess: (response) => {
          // 생성 성공 시 작성한 글 상세로 이동됨
          router.push(`review/detail/${response.reviewId}`)
        },
      })
    }
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 h-[calc(100vh-80px)]">
        <h1 className="text-2xl font-bold">
          리뷰 {isEditMode ? '수정' : '등록'}
        </h1>

        <div className="flex flex-1 gap-6 min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">제목</label>
              <input
                type="text"
                {...register('title', {
                  required: true,
                  minLength: 1,
                  maxLength: 60,
                })}
                className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="제목을 입력하세요 (최대 30자)"
                disabled={pending}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block mb-2 text-sm font-medium">내용</label>
              <textarea
                {...register('content', {
                  required: true,
                  minLength: 1,
                  maxLength: 2000,
                })}
                placeholder="내용을 입력하세요"
                className="flex-1 px-4 py-2 resize-none rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 placeholder-gray-400 dark:placeholder-gray-500 overflow-y-auto"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 text-sm"
                onClick={() => router.back()}
              >
                나가기
              </button>

              {isEditMode ? (
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm"
                  disabled={pending || updateReviewMutation.isPending}
                >
                  수정하기
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm"
                  disabled={pending || createReviewMutation.isPending}
                >
                  등록하기
                </button>
              )}
            </div>
          </div>

          <div className="w-1/2 flex flex-col min-h-0">
            <label className="block mb-2 text-sm font-medium">
              코드 에디터
            </label>
            <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
              {/* <CodeMirror
                value={code}
                onChange={(val) => setCode(val)}
                extensions={[javascript()]}
                theme={theme === 'light' ? undefined : dracula}
                className="w-full h-full"
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <ReviewMetaModal
        open={metaModalOpen}
        onClose={() => setMetaModalOpen(false)}
        isEdit={false}
      /> */}
    </div>
  )
}

export default ReviewForm
