'use client'
import { useUpdateLike } from '@/features/like/hooks/useUpdateLikeQuery'
import { useSelectLikeStateQuery } from '@/features/like/hooks/useSelectLikeStateQuery'
import { LIKE } from '#/generate'
import { useAuth } from '@/shared/hook/useAuth'
import { usePopupStore } from '@/shared/store/usePopupStore'
import { useRouter, usePathname } from 'next/navigation'

const LikeComponent = ({ reviewId }: { reviewId: number }) => {
  const router = useRouter()
  const pathName = usePathname()
  const updateLikeMutation = useUpdateLike(reviewId)
  const checkAuth = useAuth()
  const { openPopup } = usePopupStore.getState()

  const { data, isSuccess, isLoading } = useSelectLikeStateQuery(reviewId)

  const onClickHeart = async () => {
    const result = await checkAuth()
    if (!result) {
      openPopup('로그인 후에 좋아요를 누를 수 있습니다.', '', goToLogin)
      return
    }
    sendLikeReq()
  }

  const sendLikeReq = () => {
    const req: LIKE.UpdateReviewLikeReqDTO = {
      reviewId: reviewId,
    }
    updateLikeMutation.mutate(req)
  }

  const goToLogin = () => {
    router.push(`/user/login?redirect=${pathName}`)
  }

  if (isLoading) {
    return <></>
  }

  if (!isSuccess || !data) {
    return null
  }

  const { likeState, count } = data

  return (
    <button onClick={onClickHeart}>
      <span>
        {likeState ? '❤️' : '🤍'} {count}
      </span>
    </button>
  )
}

export default LikeComponent
