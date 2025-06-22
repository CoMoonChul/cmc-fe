'use client'
import Link from 'next/link'
import useUserStore from '@/shared/store/useUserStore'
import { useDeleteBattleMutation } from '@/features/battle/hooks/useDeleteBattleMutation'
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
  const deleteBattleMutation = useDeleteBattleMutation(battleId)

  const onClickDeleteBtn = () => {
    const req: BATTLE.DeleteBattleReqDTO = {
      battleId: battleId,
    }

    deleteBattleMutation.mutate(req, {
      onSuccess: async () => {
        router.replace('/battle')
      },
    })
  }

  if (user.userNum !== auditerNum) {
    return <></>
  }

  return (
    <div className="flex space-x-3">
      <Link href={`/battle/form/${battleId}`} className="text-green-500">
        수정하기
      </Link>
      <button onClick={onClickDeleteBtn} className="text-red-500">
        삭제하기
      </button>
    </div>
  )
}

export default BattleControlArea
