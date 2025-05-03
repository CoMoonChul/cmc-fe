// import dayjs from 'dayjs'
// import 'dayjs/locale/ko'
// import relativeTime from 'dayjs/plugin/relativeTime'

// dayjs.extend(relativeTime)
// dayjs.locale('ko')

// /**
//  * 24시간 이내 → "3시간 전", 그 이상 → "YYYY년 MM월 DD일" 형식으로의 변경
//  * @param createdAt 생성 시간
//  * @returns 생성 시간
//  */
// export const getFormattedCreatedAt = (createdAt: string): string => {
//   return dayjs().diff(createdAt, 'hour') < 24
//     ? dayjs(createdAt).fromNow()
//     : dayjs(createdAt).format('YYYY년 MM월 DD일')
// }
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ko')

/**
 * 24시간 이내 → "3시간 전", 그 이상 → "YYYY년 MM월 DD일" 형식으로의 변경
 * @param createdAt 생성 시간 (e.g., "2025-05-03 14:58:53")
 * @returns 한국 시간 기준으로 포맷된 시간 문자열
 */
export const getFormattedCreatedAt = (createdAt: string): string => {
  const koreaTime = dayjs.tz(createdAt, 'Asia/Seoul')
  return dayjs().diff(koreaTime, 'hour') < 24
    ? koreaTime.fromNow()
    : koreaTime.format('YYYY년 MM월 DD일')
}
