import { User } from '../user/types'

export interface Battle {
  voteId?: number
  battleId?: number
  voteValue?: number
  user?: User
  createdAt?: string
  updatedAt?: string
}
