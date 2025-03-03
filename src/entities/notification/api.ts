import { NOTICE } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'
import { apiConfig } from '@/shared/config/apiConfig'

const api = new NOTICE.NoticeControllerApi(apiConfig)

/**
 * 알림 리스트 조회(페이징)
 * @param page 요청할 페이지 번호 (0부터 시작)
 * @param size 한 페이지 당 개수
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 알림 조회 결과
 */
export async function selectPageNotice(
  page: number,
  size: number,
  manualErrorHandle = false,
): Promise<NOTICE.SelectNoticeListDTO> {
  const response = await apiClient(
    api.selectPageNotice.bind(api),
    manualErrorHandle,
    { page, size },
  )
  return response.data
}

/**
 * 알림 삭제
 * @param data DeleteNoticeReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 삭제 결과
 */
export async function deleteNotice(
  data: NOTICE.DeleteNoticeReqDTO,
  manualErrorHandle = false,
): Promise<NOTICE.DeleteNoticeResDTO> {
  const response = await apiClient(
    api.deleteNotice.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 알림 전체 삭제
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 삭제 결과
 */
export async function deleteNoticeAll(
  manualErrorHandle = false,
): Promise<NOTICE.DeleteNoticeAllResDTO> {
  const response = await apiClient(
    api.deleteNoticeAll.bind(api),
    manualErrorHandle,
  )
  return response.data
}
