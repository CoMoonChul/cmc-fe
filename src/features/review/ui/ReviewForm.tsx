'use client'

import { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { usePopupStore } from '@/shared/store/usePopupStore'
import { useForm } from 'react-hook-form'
import { useReviewDetailQuery } from '../hooks/useReviewDetailQuery'
import { useCreateReviewQuery } from '../hooks/useCreateReviewQuery'
import { useUpdateReviewQuery } from '../hooks/useUpdateReviewQuery'
import { compressGzip, decompressGzip } from '@/features/editor/helper'
import { REVIEW } from '#/generate'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
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

  const handleFinalSubmit = (activeGroups: number[]) => {
    if (!getValues('codeContent')) {
      openPopup('코드는 1~20000자 이내로 입력해 주세요.', '')
      return
    }

    const compCodeContent = compressGzip(getValues('codeContent'))

    if (!compCodeContent) {
      openPopup('코드 압축에 실패했어요. 코드 내용을 확인해 주세요.', '')
      return
    }

    const reqData = {
      title: getValues('title'),
      content: getValues('content'),
      codeContent: compCodeContent,
      codeType: getValues('codeType'),
    }

    if (isEditMode) {
      updateReviewMutation.mutate(
        { ...reqData, reviewId: Number(reviewId) },
        {
          onSuccess: (response) =>
            router.push(`/review/detail/${response.reviewId}`),
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
      })
    }
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold">
          리뷰 {isEditMode ? '수정' : '등록'}
        </h1>

        {/* 1행: 제목 입력 */}
        <div>
          <label className="block mb-2 text-sm font-medium">제목</label>
          <input
            type="text"
            {...register('title', {
              required: true,
              minLength: 1,
              maxLength: 60,
            })}
            className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="제목을 입력하세요 (최대 60자)"
            disabled={pending}
          />
        </div>

        {/* 2행: 내용 입력 */}
        <div>
          <label className="block mb-2 text-sm font-medium">내용</label>
          <textarea
            {...register('content', {
              required: true,
              minLength: 1,
              maxLength: 2000,
            })}
            placeholder="내용을 입력하세요"
            className="w-full h-60 px-4 py-2 resize-none rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 placeholder-gray-400 dark:placeholder-gray-500 overflow-y-auto"
          />
        </div>

        {/* 3행: 코드 에디터 + 언어 선택 */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">코드 에디터</label>
              <select
                {...register('codeType')}
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                  setValue('codeType', e.target.value)
                }}
                className="px-3 py-1 border border-gray-300 rounded-md bg-white dark:bg-neutral-900 dark:border-gray-700 text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
            <div className="h-[300px] border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
              <CodeMirror
                value={code}
                extensions={[languageExtensions[language]]}
                theme={theme === 'light' ? undefined : dracula}
                onChange={(value) => {
                  setCode(value)
                  setValue('codeContent', value)
                }}
                basicSetup={{ highlightActiveLine: false }}
                style={{ height: '100%', width: '100%', overflowY: 'auto' }}
              />
            </div>
          </div>

          {/* 등록/수정/나가기 버튼 */}
          <div className="flex flex-col justify-end lg:items-end gap-2 lg:w-1/2">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 text-sm"
              onClick={() => router.back()}
            >
              나가기
            </button>
            <button
              type="button"
              onClick={() => setMetaModalOpen(true)}
              className={`px-4 py-2 rounded-md ${
                isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              } text-white text-sm`}
              disabled={isSubmitting}
            >
              {isEditMode ? '수정하기' : '등록하기'}
            </button>
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
