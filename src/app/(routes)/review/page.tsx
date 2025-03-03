'use client'

import { useComments, useComment } from '@/features/comment/hooks'

export default function BattlePage() {
  const { data, isLoading, isError } = useComment(2)
  if (isLoading) {
    return <h3>Loading...</h3>
  }
  if (isError) {
    return <h3>error</h3>
  }
  return <>{JSON.stringify(data)}</>
}
