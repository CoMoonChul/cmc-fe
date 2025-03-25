'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { useBattleDetailQuery } from '@/features/battle/hooks/useBattleDetailQuery'
import { useCreateBattleQuery } from '@/features/battle/hooks/useCreateBattleQuery'
import { useUpdateBattleQuery } from '@/features/battle/hooks/useUpdateBattleQuery'
import { useFormStatus } from 'react-dom'
import CodeEditorModal from '@/features/battle/ui/CodeEditorModal'
import { BATTLE } from '#/generate'
import { useAuth } from '@/shared/hook/useAuth'

interface BattleFormValues {
  title: string
  content: string
  codeLeft: string
  codeRight: string
  codeTypeLeft: string
  codeTypeRight: string
}

const BattleForm = ({ id }: { id?: string }) => {
  const router = useRouter()
  const isEditMode = !!id
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
  const [openModal, setOpenModal] = useState<'left' | 'right' | null>(null)
  const { data } = useBattleDetailQuery(Number(id), isEditMode)
  const createBattleMutation = useCreateBattleQuery()
  const updateBattleMutation = useUpdateBattleQuery()

  useEffect(() => {
    if (data) {
      setValue('title', data.title)
      setValue('content', data.content)
      setValue('codeLeft', data.codeContentLeft)
      setValue('codeRight', data.codeContentRight)
      setValue('codeTypeLeft', data.codeTypeLeft)
      setValue('codeTypeRight', data.codeTypeRight)
    }
  }, [data, setValue])

  const onSubmit = () => {
    if (isEditMode) {
      const updateReq: BATTLE.UpdateBattleReqDTO = {
        battleId: Number(id),
        title: getValues('title'),
        content: getValues('content') || '', // undefined 방지
        codeContentLeft: getValues('codeLeft'),
        codeContentRight: getValues('codeRight'),
        codeTypeLeft: getValues('codeTypeLeft'),
        codeTypeRight: getValues('codeTypeRight'),
      }

      updateBattleMutation.mutate(updateReq, {
        onSuccess: (response) => {
          router.push(`/battle/detail/${response.battleId}`)
        },
      })
    } else {
      const createReq: BATTLE.CreateBattleReqDTO = {
        title: getValues('title'),
        content: getValues('content') || '', // undefined 방지
        codeContentLeft: getValues('codeLeft'),
        codeContentRight: getValues('codeRight'),
        codeTypeLeft: getValues('codeTypeLeft'),
        codeTypeRight: getValues('codeTypeRight'),
      }

      createBattleMutation.mutate(createReq, {
        onSuccess: (response) => {
          router.push(`/battle/detail/${response.battleId}`)
        },
      })
    }
  }

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? '배틀 수정' : '배틀 등록'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('title', {
            required: true,
            minLength: 5,
            maxLength: 60,
          })}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          placeholder="제목 (최대 30자)"
          disabled={pending}
        />

        <textarea
          {...register('content', {
            required: true,
            maxLength: 1200,
          })}
          className="w-full h-96 p-2 border rounded dark:bg-gray-800 dark:text-white"
          placeholder="내용 입력"
          disabled={pending}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="p-2 border rounded cursor-pointer hover:opacity-80 overflow-auto max-h-96"
            onClick={() => setOpenModal('left')}
          >
            <Controller
              name="codeLeft"
              control={control}
              render={({ field }) => (
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded whitespace-pre-wrap break-words">
                  {field.value || '왼쪽 코드 입력'}
                </pre>
              )}
            />
          </div>

          <div
            className="p-2 border rounded cursor-pointer hover:opacity-80 overflow-auto max-h-96"
            onClick={() => setOpenModal('right')}
          >
            <Controller
              name="codeRight"
              control={control}
              render={({ field }) => (
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded whitespace-pre-wrap break-words">
                  {field.value || '오른쪽 코드 입력'}
                </pre>
              )}
            />
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

          {isEditMode ? (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={pending || updateBattleMutation.isPending}
            >
              수정하기
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={pending || createBattleMutation.isPending}
            >
              등록하기
            </button>
          )}
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

export default BattleForm
