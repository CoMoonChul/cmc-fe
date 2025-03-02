import { Configuration } from '#/generate/configuration'
import { COMMENT } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'

const api = new COMMENT.CommentControllerApi(
  new Configuration({ basePath: '/api' }),
)

/**
 * 댓글 생성
 * @param data CreateCommentReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 생성된 댓글 정보
 */
export async function createComment(
  data: COMMENT.CreateCommentReqDTO,
  manualErrorHandle = false,
): Promise<COMMENT.CreateCommentResDTO> {
  const response = await apiClient(
    api.createComment.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 댓글 단건 조회
 * @param id 댓글 ID
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 댓글 상세 정보
 */
export async function selectComment(
  id: number,
  manualErrorHandle = false,
): Promise<COMMENT.SelectCommentResDTO> {
  const response = await apiClient(
    api.selectComment.bind(api),
    manualErrorHandle,
    id,
  )
  return response.data
}

/**
 * 댓글 목록 조회
 * @param targetId 타겟 ID
 * @param commentTarget 타겟 구분 값
 * @param page 페이지 번호 (기본값: 0)
 * @param size 페이지 사이즈 (기본값: 10)
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 댓글 리스트
 */
export async function selectCommentList(
  targetId: number,
  commentTarget: number,
  page = 0,
  size = 10,
  manualErrorHandle = false,
): Promise<COMMENT.SelectCommentListResDTO> {
  const response = await apiClient(
    api.selectCommentList.bind(api),
    manualErrorHandle,
    targetId,
    commentTarget,
    page,
    size,
  )
  return response.data
}

/**
 * 댓글 삭제
 * @param data DeleteCommentReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 삭제된 댓글 정보
 */
export async function deleteComment(
  data: COMMENT.DeleteCommentReqDTO,
  manualErrorHandle = false,
): Promise<COMMENT.DeleteCommentResDTO> {
  const response = await apiClient(
    api.deleteComment.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 댓글 수정
 * @param data UpdateCommentReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 수정된 댓글 정보
 */
export async function updateComment(
  data: COMMENT.UpdateCommentReqDTO,
  manualErrorHandle = false,
): Promise<COMMENT.UpdateCommentResDTO> {
  const response = await apiClient(
    api.updateComment.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}
