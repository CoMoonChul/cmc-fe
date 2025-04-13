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
import ReviewCodeArea from './ReviewCodeArea'
import { languageExtensions } from '@/entities/editor/types'
import { useThemeStore } from '@/shared/store/useThemeStore'
import ReviewTargetModal from './ReviewTargetModal'

interface ReviewFormValues {
  title: string
  content: string
  codeContent: string
  codeType: string
}

const ReviewForm = ({ reviewId }: { reviewId?: string }) => {
  const [metaModalOpen, setMetaModalOpen] = useState(false)
  const router = useRouter()

  // 수정/등록 분기
  const isEditMode = !!reviewId
  const { openPopup } = usePopupStore.getState()
  const { theme } = useThemeStore()
  const {
    register,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<ReviewFormValues>({
    defaultValues: {
      title: '',
      content: '',
      codeContent: '',
      codeType: 'javascript',
    },
  })

  const { pending } = useFormStatus()
  const [code, setCode] = useState<string>('') // 코드 에디터 상태
  const [language, setLanguage] = useState<string>('javascript') // 코드 타입 상태
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
      setValue('codeContent', deCompCodeContent)
      setValue('codeType', data.codeType)
      setCode(deCompCodeContent)
      setLanguage(data.codeType)
    }
  }, [data, setValue])

  // 모달에서 전달받은 데이터 처리
  const handleFinalSubmit = (activeGroups: number[]) => {
    const compCodeContent = compressGzip(getValues('codeContent'))

    const reqData = {
      title: getValues('title'),
      content: getValues('content'),
      codeContent: compCodeContent ? compCodeContent : '',
      codeType: getValues('codeType'),
    }

    if (isEditMode) {
      updateReviewMutation.mutate(
        { ...reqData, reviewId: Number(reviewId) },
        {
          onSuccess: (response) =>
            router.push(`/review/detail/${response.reviewId}`),
          onError: () => openPopup('수정 실패', ''),
        },
      )
    } else {
      const createReq: REVIEW.CreateReviewReqDTO = {
        ...reqData,
        groups: activeGroups,
      }
      createReviewMutation.mutate(createReq, {
        onSuccess: (response) =>
          router.push(`/review/detail/${response.reviewId}`),
        onError: () => openPopup('등록 실패', ''),
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
              <button
                type="button"
                onClick={() => {
                  setMetaModalOpen(true)
                }}
                className={`px-4 py-2 rounded-md ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white text-sm`}
                disabled={isSubmitting}
              >
                {isEditMode ? '수정하기' : '등록하기'}
              </button>
            </div>
          </div>

          <div className="w-1/2 flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-2">
              <label className="block mb-2 text-sm font-medium">
                코드 에디터
              </label>
              {/* 언어 선택 드롭다운 */}
              <select
                {...register('codeType')}
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                  setValue('codeType', e.target.value) // React Hook Form에 값 설정
                }}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-neutral-900 dark:border-gray-700 text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
            <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
              <CodeMirror
                value={code}
                extensions={[languageExtensions[language]]}
                theme={theme === 'light' ? undefined : dracula}
                onChange={(value) => {
                  setCode(value)
                  setValue('codeContent', value) // React Hook Form에 값 설정
                }}
                readOnly={false}
                basicSetup={{ highlightActiveLine: false }}
                className="my-8 border-gray-300 dark:border-gray-700"
                style={{ minHeight: '100%', maxHeight: '100%', width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
      <ReviewTargetModal
        open={metaModalOpen}
        onClose={() => setMetaModalOpen(false)}
        onSubmit={handleFinalSubmit}
        isEdit={isEditMode}
      />
    </div>
  )
}

export default ReviewForm
