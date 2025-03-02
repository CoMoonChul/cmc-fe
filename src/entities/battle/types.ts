import { User } from '../user/types'

export interface Battle {
  battleId?: number
  title?: string
  content?: number
  endTime?: string
  codeContentLeft?: string
  codeContentRight?: string
  user?: User
  createdAt?: string
  updatedAt?: string
}
