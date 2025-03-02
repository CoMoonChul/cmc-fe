import { User } from '../user/types'

export interface Comment {
  commentId?: number
  content?: string
  targetId?: number
  commentTarget?: number
  createdAt?: string
  updatedAt?: string
  user?: User
}
