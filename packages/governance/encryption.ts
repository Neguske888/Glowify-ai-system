import type { Timestamp } from "./types"

export interface EncryptionPolicy {
  readonly encryptionId: string
  readonly required: boolean
  readonly algorithm?: string
  readonly keyPolicyId?: string
  readonly rotatedAt?: Timestamp
}
