import { User } from '../user/types'

export interface Review {
  reviewId?: number
  title?: string
  content?: string
  codeContent?: string
  viewCount?: number
  likeCount?: number
  user?: User
  createdAt?: string
  updatedAt?: string
}
