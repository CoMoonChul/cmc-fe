import { Configuration } from '#/generate/configuration'
import { EDITOR } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'

const api = new EDITOR.EditorControllerApi(
  new Configuration({ basePath: '/api' }),
)

/**
 * 코드 에디터 저장
 * @param data CreateEditorReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 생성된 코드 에디터 정보
 */
export async function createEditor(
  data: EDITOR.CreateEditorReqDTO,
  manualErrorHandle = false,
): Promise<EDITOR.CreateEditorResDTO> {
  const response = await apiClient(
    api.createEditor.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 코드 에디터 수정
 * @param data UpdateEditorReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 수정된 코드 에디터 정보
 */
export async function updateEditor(
  data: EDITOR.UpdateEditorReqDTO,
  manualErrorHandle = false,
): Promise<EDITOR.UpdateEditorResDTO> {
  const response = await apiClient(
    api.updateEditor.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 코드 에디터 삭제
 * @param data DeleteEditorReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 삭제된 코드 에디터 정보
 */
export async function deleteEditor(
  data: EDITOR.DeleteEditorReqDTO,
  manualErrorHandle = false,
): Promise<EDITOR.DeleteEditorResDTO> {
  const response = await apiClient(
    api.deleteEditor.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 코드 에디터 단건 조회
 * @param id 에디터 ID
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: true)
 * @returns 조회된 코드 에디터 정보
 */
export async function selectEditor(
  id: number,
  manualErrorHandle = false,
): Promise<EDITOR.SelectEditorResDTO> {
  const response = await apiClient(
    api.selectEditor.bind(api),
    manualErrorHandle,
    { id },
  )
  return response.data
}
