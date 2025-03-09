import { REDIS } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'
import { apiConfig } from '@/shared/config/apiConfig'

const api = new REDIS.RedisControllerApi(apiConfig)

/**
 * Redis에 항목 저장
 * @param data SaveRedisReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 저장 결과
 */
export async function saveRedis(
  data: REDIS.SaveRedisReqDTO,
  manualErrorHandle = false,
): Promise<REDIS.SaveRedisResDTO> {
  const response = await apiClient(
    api.saveRedis.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 특정 키로 Redis 항목 조회
 * @param key Redis 항목의 키
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 조회된 항목 정보
 */
export async function selectRedis(
  key: string,
  manualErrorHandle = false,
): Promise<REDIS.SelectRedisResDTO> {
  const response = await apiClient(
    api.selectRedis.bind(api),
    manualErrorHandle,
    { key },
  )
  return response.data
}

/**
 * Redis 항목 삭제
 * @param data DeleteRedisReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 삭제 결과
 */
export async function deleteRedis(
  data: REDIS.DeleteRedisReqDTO,
  manualErrorHandle = false,
): Promise<void> {
  const response = await apiClient(
    api.deleteRedis.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * Redis 해시에 항목 저장
 * @param data SaveHashReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 저장 결과
 */
export async function saveHash(
  data: REDIS.SaveHashReqDTO,
  manualErrorHandle = false,
): Promise<REDIS.SaveHashResDTO> {
  const response = await apiClient(
    api.saveHash.bind(api),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * Redis 해시 조회
 * @param key Redis 해시의 키
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 조회된 해시 정보
 */
export async function selectHash(
  key: string,
  manualErrorHandle = false,
): Promise<REDIS.SelectHashResDTO> {
  const response = await apiClient(
    api.selectHash.bind(api),
    manualErrorHandle,
    { key },
  )
  return response.data
}
