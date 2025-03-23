'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { createBattle } from '@/entities/battle/api'
import { useFormStatus } from 'react-dom'
import CodeEditorModal from '../COMPONENT/CodeEditorModal'

interface BattleFormValues {
  title: string
  content: string
  codeLeft: string
  codeRight: string
  codeTypeLeft: 'javascript' | 'python' | 'java'
  codeTypeRight: 'javascript' | 'python' | 'java'
}

const BattleCreatePage = () => {
  const router = useRouter()
  const { register, handleSubmit, control, setValue, getValues } =
    useForm<BattleFormValues>({
      defaultValues: {
        title: '',
        content: '',
        codeLeft: '',
        codeRight: '',
        codeTypeLeft: 'javascript',
        codeTypeRight: 'javascript',
      },
    })
  const { pending } = useFormStatus()

  const mutation = useMutation({
    mutationFn: createBattle,
    onSuccess: (data) => {
      router.push(`/battle/detail/${data.battleId}`)
    },
  })

  const [openModal, setOpenModal] = useState<'left' | 'right' | null>(null)

  const onSubmit = (formData: BattleFormValues) => {
    // mutation.mutate(formData)
    console.log('mutation 호출')
  }

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">배틀 등록</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('title', { required: true, maxLength: 30 })}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          placeholder="제목 (최대 30자)"
          disabled={pending}
        />

        <textarea
          {...register('content')}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          placeholder="내용 입력"
          rows={4}
          disabled={pending}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="p-2 border rounded cursor-pointer hover:opacity-80"
            onClick={() => setOpenModal('left')}
          >
            <Controller
              name="codeLeft"
              control={control}
              render={({ field }) => (
                <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {field.value || '왼쪽 코드 입력'}
                </pre>
              )}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              언어: {getValues('codeTypeLeft')}
            </p>
          </div>

          <div
            className="p-2 border rounded cursor-pointer hover:opacity-80"
            onClick={() => setOpenModal('right')}
          >
            <Controller
              name="codeRight"
              control={control}
              render={({ field }) => (
                <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {field.value || '오른쪽 코드 입력'}
                </pre>
              )}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              언어: {getValues('codeTypeRight')}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="px-4 py-2 border rounded bg-gray-300 dark:bg-gray-700"
            onClick={() => router.back()}
          >
            나가기
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={pending || mutation.isPending}
          >
            등록하기
          </button>
        </div>
      </form>

      {openModal && (
        <CodeEditorModal
          initialCode={getValues(
            openModal === 'left' ? 'codeLeft' : 'codeRight',
          )}
          initialLanguage={getValues(
            openModal === 'left' ? 'codeTypeLeft' : 'codeTypeRight',
          )}
          onClose={() => setOpenModal(null)}
          onSave={(updatedCode, updatedLanguage) => {
            if (openModal === 'left') {
              setValue('codeLeft', updatedCode)
              setValue('codeTypeLeft', updatedLanguage)
            } else {
              setValue('codeRight', updatedCode)
              setValue('codeTypeRight', updatedLanguage)
            }
          }}
        />
      )}
    </div>
  )
}

export default BattleCreatePage
