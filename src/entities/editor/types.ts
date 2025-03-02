import { User } from '../user/types'

export interface Editor {
  codeEditNum?: number
  content?: number
  language?: string
  user?: User
  createdAt?: string
  updatedAt?: string
}
