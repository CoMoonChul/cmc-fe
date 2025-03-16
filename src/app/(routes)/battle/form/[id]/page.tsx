'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const BattleFromPage = () => {
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
      <h1>Battle Form</h1>
      <p>Battle ID: {params.id}</p>
    </>
  )
}

export default BattleFromPage
