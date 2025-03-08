import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('ko')

/**
 * 24시간 이내 → "3시간 전", 그 이상 → "YYYY년 MM월 DD일" 형식으로의 변경
 * @param createdAt 생성 시간
 * @returns 생성 시간
 */
export const getFormattedCreatedAt = (createdAt: string): string => {
  return dayjs().diff(createdAt, 'hour') < 24
    ? dayjs(createdAt).fromNow()
    : dayjs(createdAt).format('YYYY년 MM월 DD일')
}
