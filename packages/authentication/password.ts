import type { Timestamp } from "./types"

export interface PasswordPolicy {
  readonly minLength?: number
  readonly maxLength?: number
  readonly requireUppercase?: boolean
  readonly requireLowercase?: boolean
  readonly requireNumber?: boolean
  readonly requireSymbol?: boolean
  readonly historyCount?: number
  readonly expiresAfterDays?: number
}

export interface PasswordHistoryEntry {
  readonly passwordId: string
  readonly userId?: string
  readonly changedAt?: Timestamp
}
