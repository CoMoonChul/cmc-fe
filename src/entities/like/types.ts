import { User } from '../user/types'

export interface ReviewLike {
  id?: ReviewLikeId
  likedAt?: string
  user?: User
}

export interface ReviewLikeId {
  userNum?: number
  reviewId?: number
  content?: number
  endTime?: string
  codeContentLeft?: string
  codeContentRight?: string
  user?: User
  createdAt?: string
  updatedAt?: string
}
