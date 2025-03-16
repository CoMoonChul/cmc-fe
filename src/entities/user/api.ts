import { USER } from '#/generate'
import { apiClient } from '@/shared/api/apiClient'
import { apiConfig } from '@/shared/config/apiConfig'
import { axiosInstance } from '@/shared/config/axiosInstance'

const userApi = new USER.UserControllerApi(
  apiConfig,
  apiConfig.basePath,
  axiosInstance,
)
const joinApi = new USER.JoinControllerApi(
  apiConfig,
  apiConfig.basePath,
  axiosInstance,
)
const loginApi = new USER.LoginControllerApi(
  apiConfig,
  apiConfig.basePath,
  axiosInstance,
)

/**
 * 로그인 - 넥스트 로그인 라우터를 통한 처리
 * @param userId 아이디
 * @param password 비밀번호
 * @returns 로그인 결과
 */
export async function loginNext(userId: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, password }),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('로그인 실패')
  }

  return await response.json()
}

/**
 * 로그아웃 - 넥스트 로그아웃 라우터를 통한 처리
 * @returns 로그아웃 결과
 */
export async function logoutNext() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('로그아웃 실패')
  }
}

/**
 * 회원가입
 * @param data JoinReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 회원가입 결과
 */
export async function join(
  data: USER.JoinReqDTO,
  manualErrorHandle = false,
): Promise<USER.JoinResDTO> {
  const response = await apiClient(
    joinApi.join.bind(joinApi),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * ID 중복 체크
 * @param userId 확인할 사용자 ID
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 중복 체크 결과
 */
export async function checkUserId(
  userId: string,
  manualErrorHandle = false,
): Promise<USER.CheckJoinResDTO> {
  const response = await apiClient(
    joinApi.checkUserId.bind(joinApi),
    manualErrorHandle,
    { userId },
  )
  return response.data
}

/**
 * 닉네임 중복 체크
 * @param username 확인할 닉네임
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 중복 체크 결과
 */
export async function checkUsername(
  username: string,
  manualErrorHandle = false,
): Promise<USER.CheckJoinResDTO> {
  const response = await apiClient(
    joinApi.checkUsername.bind(joinApi),
    manualErrorHandle,
    { username },
  )
  return response.data
}

/**
 * 임시 로그인
 * @param data TempLoginReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 로그인 결과
 */
export async function tempLogin(
  data: USER.TempLoginReqDTO,
  manualErrorHandle = false,
): Promise<USER.TempLoginResDTO> {
  const response = await apiClient(
    loginApi.tempLogin.bind(loginApi),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 로그인
 * @param data LoginReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 로그인 결과
 */
export async function login(
  data: USER.LoginReqDTO,
  manualErrorHandle = false,
): Promise<USER.LoginResDTO> {
  const response = await apiClient(
    loginApi.login.bind(loginApi),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * AccessToken 재발급
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 재발급된 AccessToken
 */
export async function refresh(
  manualErrorHandle = false,
): Promise<USER.RefreshResDTO> {
  const response = await apiClient(
    loginApi.refresh.bind(loginApi),
    manualErrorHandle,
  )
  return response.data
}

/**
 * 로그아웃
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 로그아웃 결과
 */
export async function logout(
  manualErrorHandle = false,
): Promise<USER.LogoutResDTO> {
  const response = await apiClient(
    loginApi.logout.bind(loginApi),
    manualErrorHandle,
  )
  return response.data
}

/**
 * 계정 찾기
 * @param data FindAccountReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 계정 정보
 */
export async function findAccount(
  data: USER.FindAccountReqDTO,
  manualErrorHandle = false,
): Promise<USER.FindAccountResDTO> {
  const response = await apiClient(
    loginApi.findAccount.bind(loginApi),
    manualErrorHandle,
    data,
  )
  return response.data
}

/**
 * 내 정보 조회
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 내 정보
 */
export async function getMyInfo(
  manualErrorHandle = false,
): Promise<USER.GetMyInfoResDTO> {
  const response = await apiClient(
    userApi.getMyInfo.bind(userApi),
    manualErrorHandle,
  )
  return response.data
}

/**
 * 회원 탈퇴
 * @param data WithdrawReqDTO
 * @param manualErrorHandle 에러 핸들링 여부 (기본값: false)
 * @returns 탈퇴 결과
 */
export async function withdraw(
  data: USER.WithdrawReqDTO,
  manualErrorHandle = false,
): Promise<USER.WithdrawResDTO> {
  const response = await apiClient(
    userApi.withdraw.bind(userApi),
    manualErrorHandle,
    data,
  )
  return response.data
}
