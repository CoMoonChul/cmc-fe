import ReviewForm from '@/features/review/ui/ReviewForm'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface ReviewEditPageProps {
  params: Promise<{ reviewId: string }>
}

const ReviewEditPage: FC<ReviewEditPageProps> = async ({ params }) => {
  const { reviewId } = await params
  if (Number.isNaN(Number(reviewId))) {
    notFound()
  }

  return <ReviewForm reviewId={reviewId} />
}

export default ReviewEditPage
