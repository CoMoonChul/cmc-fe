import ReviewForm from '@/features/review/ui/ReviewForm'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface ReviewEditPageProps {
  params: Promise<{ id: string }>
}

const ReviewEditPage: FC<ReviewEditPageProps> = async ({ params }) => {
  const { id } = await params
  if (Number.isNaN(Number(id))) {
    notFound()
  }

  return <ReviewForm reviewId={id} />
}

export default ReviewEditPage
