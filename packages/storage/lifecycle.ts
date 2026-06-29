import type { StorageLifecycleStatus, Timestamp } from './types'

export interface LifecyclePolicyRule {
  readonly name: string
  readonly status: StorageLifecycleStatus
  readonly transitionAfterDays?: number
  readonly archiveAfterDays?: number
  readonly deleteAfterDays?: number
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface LifecyclePolicy {
  readonly name: string
  readonly rules: ReadonlyArray<LifecyclePolicyRule>
  readonly appliesTo?: ReadonlyArray<string>
  readonly enabled?: boolean
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface LifecycleManager {
  apply(objectId: string): Promise<StorageLifecycleStatus>
  rules(): Promise<ReadonlyArray<LifecyclePolicyRule>>
}
