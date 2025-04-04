import { GROUP } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'
import { getApiConfig } from '@/shared/config/apiConfig'
import { axiosInstance } from '@/shared/config/axiosInstance'

const config = getApiConfig()

const groupApi = new GROUP.GroupControllerApi(
  config,
  config.basePath,
  axiosInstance,
)

/**
 * 그룹 생성
 * @param data CreateReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 그룹 생성 결과
 */
export async function create(
  data: GROUP.CreateReqDTO,
  manualErrorHandle = false,
): Promise<GROUP.CreateResDTO> {
  const response = await apiClient(
    groupApi.create.bind(groupApi),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 그룹 멤버 리스트 조회
 * @param groupId 그룹 ID
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 그룹 멤버 리스트 조회 결과
 */
export async function getGroupMemberList(
  groupId: number,
  manualErrorHandle = false,
): Promise<GROUP.GetGroupMemberListResDTO> {
  const response = await apiClient(
    groupApi.getGroupMemberList.bind(groupApi),
    manualErrorHandle,
    groupId,
  )
  return response.data
}

/**
 * 그룹 멤버 초대하기
 * @param data InviteReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 그룹 멤버 초대하기 결과
 */
export async function invite(
  data: GROUP.InviteReqDTO,
  manualErrorHandle = false,
): Promise<GROUP.InviteResDTO> {
  const response = await apiClient(
    groupApi.invite.bind(groupApi),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 그룹 삭제
 * @param data DeleteReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 그룹 삭제 결과
 */
export async function _delete(
  data: GROUP.DeleteReqDTO,
  manualErrorHandle = false,
): Promise<GROUP.DeleteResDTO> {
  const response = await apiClient(
    groupApi._delete.bind(groupApi),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 그룹 멤버 내보내기
 * @param data ExpelReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 그룹 멤버 내보내기
 */
export async function expel(
  data: GROUP.ExpelReqDTO,
  manualErrorHandle = false,
): Promise<GROUP.ExpelResDTO> {
  const response = await apiClient(
    groupApi.expel.bind(groupApi),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 나의 그룹 리스트 조회
 * @param data ExpelReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 나의 그룹 리스트 조회
 */
export async function getMyGroupList(
  manualErrorHandle = false,
): Promise<GROUP.GetMyGroupListResDTO> {
  const response = await apiClient(
    groupApi.getMyGroupList.bind(groupApi),
    manualErrorHandle,
  )
  return response.data
}
