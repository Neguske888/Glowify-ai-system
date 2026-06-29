import type { Timestamp } from "./types"

export interface KeyPolicy {
  readonly keyPolicyId: string
  readonly provider?: string
  readonly keyRotationDays?: number
  readonly rotationRequired?: boolean
  readonly revokedAt?: Timestamp
}
