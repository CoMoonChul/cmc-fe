import { useQuery } from '@tanstack/react-query'
import { getMyInfo } from '@/entities/user/api'
import { USER } from '#/generate'
import { QUERY_KEYS } from '../types'

/**
 * 내 정보 조회
 * @returns API 응답 데이터
 */
export const useGetMyInfoQuery = () => {
  return useQuery<USER.GetMyInfoResDTO>({
    queryKey: [QUERY_KEYS.USER.DETAIL],
    queryFn: () => getMyInfo(),
  })
}
