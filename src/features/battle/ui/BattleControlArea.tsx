'use client'
import Link from 'next/link'
import useUserStore from '@/shared/store/useUserStore'
import { useDeleteCommentMutation } from '@/features/battle/hooks/useDeleteBattleMutation'
import { BATTLE } from '#/generate'
import { useRouter } from 'next/navigation'

const BattleControlArea = ({
  battleId,
  auditerNum,
}: {
  battleId: number
  auditerNum: number
}) => {
  const { user } = useUserStore()
  const router = useRouter()
  const deleteBattleMutation = useDeleteCommentMutation(battleId)

  const onClickDeleteBtn = () => {
    const req: BATTLE.DeleteBattleReqDTO = {
      battleId: battleId,
    }

    deleteBattleMutation.mutate(req, {
      onSuccess: () => {
        router.push('/battle')
      },
    })
  }

  if (user.userNum !== auditerNum) {
    return <></>
  }

  return (
    <div className="flex gap-2">
      <Link
        href={`/battle/form/${battleId}`}
        className="px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
      >
        수정하기
      </Link>
      <div
        onClick={onClickDeleteBtn}
        className="px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
      >
        삭제하기
      </div>
    </div>
  )
}

export default BattleControlArea
