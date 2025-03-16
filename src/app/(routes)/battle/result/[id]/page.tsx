'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const BattleResultPage = () => {
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const { id } = params

    if (isNaN(Number(id))) {
      router.replace('/404')
    }
  }, [params, router])

  return (
    <>
      <h1>Battle Result</h1>
      <p>Battle ID: {params.id}</p>
    </>
  )
}

export default BattleResultPage
