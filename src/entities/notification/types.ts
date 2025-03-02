import { NotificationTemplate } from '../notificationTemplate/types'

export interface Notification {
  notiId?: number
  userNum?: string
  notiTemplate?: NotificationTemplate
  sendAt?: string
  sendState?: string
  linkUrl?: string
  createdAt?: string
  updatedAt?: string
  reasonNoti?: string
}
