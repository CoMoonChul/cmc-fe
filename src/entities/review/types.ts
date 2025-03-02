import { User } from '../user/types'

export interface Review {
  reviewId?: number
  title?: string
  content?: string
  codeContent?: string
  user?: User
  createdAt?: string
  updatedAt?: string
}
