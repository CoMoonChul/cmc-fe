export type UUID = string

export interface LiveCodingRoom {
  roomId: UUID // 방 ID
  hostId: number // 방장 ID (userNum)
  createdAt: string // 생성 일시 (ISO 문자열)
  participantCount: number // 참가자 수
  participants: number[] // 참가자 ID 목록
  link: string // 초대 링크
}
