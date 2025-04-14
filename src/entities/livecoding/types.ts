export interface LiveCoding {
  liveCodingId?: number
  hostId?: number
  createdAt?: string
  updatedAt?: string
}

export interface diff {
  op: number
  text: string
}
