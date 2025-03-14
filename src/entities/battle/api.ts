import { BATTLE } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'
import { apiConfig } from '@/shared/config/apiConfig'
import { axiosInstance } from '@/shared/config/axiosInstance'

const api = new BATTLE.BattleControllerApi(
  apiConfig,
  apiConfig.basePath,
  axiosInstance,
)

/**
 * 배틀 단건 조회
 * @param battleId 배틀 ID
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 조회된 배틀 정보
 */
export async function selectBattle(
  battleId: number,
  manualErrorHandle = false,
): Promise<BATTLE.SelectBattleResDTO> {
  const response = await apiClient(
    api.selectBattle.bind(api),
    manualErrorHandle,
    battleId,
  )
  return response.data
}

/**
 * 배틀 리스트 조회
 * @param condition 조회 조건(0:최신순, 1:투표순, 2:로그인회원작성, 3:로그인회원투표참여)
 * @param page 페이지 번호
 * @param size 페이지 사이즈
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 배틀 리스트
 */
export async function selectBattleList(
  condition: number,
  page: number = 0,
  size: number = 10,
  manualErrorHandle = false,
): Promise<BATTLE.SelectBattleListResDTO> {
  const response = await apiClient(
    api.selectBattleList.bind(api),
    manualErrorHandle,
    condition,
    page,
    size,
  )
  return response.data
}

/**
 * 배틀 생성
 * @param data CreateBattleReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 생성된 배틀 정보
 */
export async function createBattle(
  data: BATTLE.CreateBattleReqDTO,
  manualErrorHandle = false,
): Promise<BATTLE.CreateBattleResDTO> {
  const response = await apiClient(
    api.createBattle.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 배틀 수정
 * @param data UpdateBattleReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 수정된 배틀 정보
 */
export async function updateBattle(
  data: BATTLE.UpdateBattleReqDTO,
  manualErrorHandle = false,
): Promise<BATTLE.UpdateBattleResDTO> {
  const response = await apiClient(
    api.updateBattle.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 배틀 투표 (기존 투표가 있다면 변경됨)
 * @param data UpdateVoteBattleReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 변경된 배틀 투표 정보
 */
export async function updateVoteBattle(
  data: BATTLE.UpdateVoteBattleReqDTO,
  manualErrorHandle = false,
): Promise<BATTLE.UpdateVoteBattleResDTO> {
  const response = await apiClient(
    api.updateVoteBattle.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 배틀 투표 삭제
 * @param data DeleteVoteBattleReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 삭제된 투표 정보
 */
export async function deleteVoteBattle(
  data: BATTLE.DeleteVoteBattleReqDTO,
  manualErrorHandle = false,
): Promise<BATTLE.DeleteVoteBattleResDTO> {
  const response = await apiClient(
    api.deleteVoteBattle.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 배틀 삭제
 * @param data DeleteBattleReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 삭제된 배틀 정보
 */
export async function deleteBattle(
  data: BATTLE.DeleteBattleReqDTO,
  manualErrorHandle = false,
): Promise<BATTLE.DeleteBattleResDTO> {
  const response = await apiClient(
    api.deleteBattle.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}
