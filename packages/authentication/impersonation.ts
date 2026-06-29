import type { Timestamp } from "./types"

export interface ImpersonationMetadata {
  readonly impersonationId: string
  readonly actorId?: string
  readonly targetUserId?: string
  readonly startedAt?: Timestamp
  readonly endedAt?: Timestamp
}

export interface ImpersonationContract {
  readonly metadata: ImpersonationMetadata
  readonly reason?: string
}
