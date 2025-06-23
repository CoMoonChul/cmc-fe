import { useQuery } from '@tanstack/react-query'
import { getMyInfo } from '@/entities/user/api'
import { USER } from '#/generate'
import { userKeys } from '../types'

/**
 * 내 정보 조회
 * @returns API 응답 데이터
 */
export const useGetMyInfoQuery = () => {
  return useQuery<USER.GetMyInfoResDTO>({
    queryKey: userKeys.detail(),
    queryFn: () => getMyInfo(),
  })
}
