import type { MultiFactorType, Timestamp } from "./types"

export interface MultiFactorMetadata {
  readonly factorId: string
  readonly userId?: string
  readonly type: MultiFactorType
  readonly enabled?: boolean
  readonly enrolledAt?: Timestamp
}

export interface MultiFactorContract {
  readonly metadata: MultiFactorMetadata
  readonly label?: string
}
