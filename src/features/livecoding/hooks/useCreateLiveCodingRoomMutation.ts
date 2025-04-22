import { LIVECODING } from '#/generate'
import { useMutation } from '@tanstack/react-query'
import {
  createLiveCoding,
  deleteLiveCoding,
  updateLiveCodingSnippet,
} from '@/entities/livecoding/api'

export const useCreateLiveCodingRoomMutation = () => {
  return useMutation<
    LIVECODING.CreateLiveCodingResDTO,
    Error,
    { hostId: number; code: string; language: string }
  >({
    mutationFn: async ({ hostId, code, language }) => {
      let createdRoomId: string | null = null

      try {
        // 1. 방 생성
        const createResponse = await createLiveCoding({ hostId })
        createdRoomId = createResponse.roomId
        const isBroadcast = true
        console.log(
          'updateLiveCodingSnippet req',
          createdRoomId,
          code,
          language,
        )

        // 2. 스니펫 초기화
        await updateLiveCodingSnippet(
          code,
          createdRoomId,
          hostId,
          [{ op: 0, text: '' }],
          language,
          { line: 0, ch: 0 },
          isBroadcast,
        )

        return createResponse
      } catch (err) {
        if (createdRoomId) {
          await deleteLiveCoding({ roomId: createdRoomId })
        }
        throw err
      }
    },
  })
}

// export const useCreateLiveCodingRoomMutation = (
//   hostId: number,
//   code: string,
//   language: string,
// ) => {
//   return useMutation<
//     LIVECODING.CreateLiveCodingResDTO,
//     Error,
//     LIVECODING.CreateLiveCodingReqDTO
//   >({
//     mutationFn: async (data) => {
//       const createdRoomId: string | null = null
//       try {
//         // 1. 방 생성 API 호출
//         const createResponse = await createLiveCoding(data)

//         console.log(
//           'updateLiveCodingSnippet req',
//           createResponse.roomId,
//           code,
//           language,
//         )

//         // 2.
//         await updateLiveCodingSnippet(
//           code, // 코드
//           createResponse.roomId,
//           hostId,
//           [{ op: 0, text: '' }], // 기본 diff 값 (현재 BE에서 requeied 되어 있어 임시 적용)
//           language, // 언어
//           { line: 0, ch: 0 }, // 기본 커서 위치 (현재 BE에서 requeied 되어 있어 임시 적용)
//         )
//         return createResponse
//       } catch (error) {
//         // 스니펫 업데이트 실패 시 방 삭제 시도
//         if (createdRoomId) await deleteLiveCoding(createdRoomId)
//         throw error
//       }
//     },
//   })
// }
