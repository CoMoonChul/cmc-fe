// import { LIVECODING } from '#/generate'
// import { apiClient } from '@/shared/api/apiClient'
// import { apiConfig } from '@/shared/config/apiConfig'

// const api = new LIVECODING.LiveCodingControllerApi(apiConfig)

// /**
//  * 라이브 코딩 방 생성
//  * @param data CreateLiveCodingReqDTO
//  * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
//  * @returns 생성된 라이브 코딩 방 정보
//  */
// export async function createLiveCoding(
//   data: LIVECODING.CreateLiveCodingReqDTO,
//   manualErrorHandle = false,
// ): Promise<LIVECODING.CreateLiveCodingResDTO> {
//   const response = await apiClient(
//     api.createLiveCoding.bind(api),
//     manualErrorHandle,
//     data,
//   )
//   return response.data
// }

// /**
//  * 라이브 코딩 방 삭제
//  * @param data DeleteLiveCodingReqDTO
//  * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
//  * @returns 삭제된 라이브 코딩 방 정보
//  */
// export async function deleteLiveCoding(
//   data: LIVECODING.DeleteLiveCodingReqDTO,
//   manualErrorHandle = false,
// ): Promise<LIVECODING.DeleteLiveCodingResDTO> {
//   const response = await apiClient(
//     api.deleteLiveCoding.bind(api),
//     manualErrorHandle,
//     data,
//   )
//   return response.data
// }

// /**
//  * 라이브 코딩 방 정보 업데이트
//  * @param data UpdateLiveCodingReqDTO
//  * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
//  * @returns 업데이트된 라이브 코딩 방 정보
//  */
// export async function updateLiveCoding(
//   data: LIVECODING.UpdateLiveCodingReqDTO,
//   manualErrorHandle = false,
// ): Promise<LIVECODING.UpdateLiveCodingResDTO> {
//   const response = await apiClient(
//     api.updateLiveCoding.bind(api),
//     manualErrorHandle,
//     data,
//   )
//   return response.data
// }

// /**
//  * 라이브 코딩 방 조회
//  * @param roomId 라이브 코딩 방 ID (UUID)
//  * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
//  * @returns 조회된 라이브 코딩 방 정보
//  */
// export async function selectLiveCoding(
//   roomId: string,
//   manualErrorHandle = false,
// ): Promise<LIVECODING.SelectLiveCodingResDTO> {
//   const response = await apiClient(
//     api.selectLiveCoding.bind(api),
//     manualErrorHandle,
//     { roomId },
//   )
//   return response.data
// }

// /**
//  * 라이브 코딩 방 초대 링크 생성
//  * @param data InviteLiveCodingReqDTO
//  * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
//  * @returns 생성된 초대 링크 정보
//  */
// export async function inviteLiveCoding(
//   data: LIVECODING.InviteLiveCodingReqDTO,
//   manualErrorHandle = false,
// ): Promise<LIVECODING.InviteLiveCodingResDTO> {
//   const response = await apiClient(
//     api.inviteLiveCoding.bind(api),
//     manualErrorHandle,
//     data,
//   )
//   return response.data
// }

// /**
//  * 라이브 코딩 방에서 나가기
//  * @param data LeaveLiveCodingReqDTO
//  * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
//  * @returns 라이브 코딩 방 나가기 결과
//  */
// export async function leaveLiveCoding(
//   data: LIVECODING.LeaveLiveCodingReqDTO,
//   manualErrorHandle = false,
// ): Promise<LIVECODING.LeaveLiveCodingResDTO> {
//   const response = await apiClient(
//     api.leaveLiveCoding.bind(api),
//     manualErrorHandle,
//     data,
//   )
//   return response.data
// }
