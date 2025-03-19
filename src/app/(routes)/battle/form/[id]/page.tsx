import { notFound } from 'next/navigation'
import { FC } from 'react'
import BattleForm from '@/features/battle/ui/BattleForm'

interface BattleEditPageProps {
  params: Promise<{ id: string }>
}

const BattleEditPage: FC<BattleEditPageProps> = async ({ params }) => {
  const { id } = await params
  if (Number.isNaN(Number(id))) {
    notFound()
  }

  return <BattleForm id={id} />
}

export default BattleEditPage
