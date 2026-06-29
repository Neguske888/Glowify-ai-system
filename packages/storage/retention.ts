import type { Timestamp, StorageRetentionMode } from './types'

export interface RetentionRule {
  readonly name: string
  readonly mode: StorageRetentionMode
  readonly retainForDays?: number
  readonly deleteAfterDays?: number
  readonly legalHold?: boolean
  readonly objectLock?: boolean
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface RetentionPolicy {
  readonly name: string
  readonly rules: ReadonlyArray<RetentionRule>
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface RetentionPolicyManager {
  resolve(objectId: string): Promise<RetentionPolicy | undefined>
  apply(objectId: string, policy: RetentionPolicy): Promise<RetentionPolicy>
}
