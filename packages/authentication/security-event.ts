import type { Timestamp } from "./types"

export interface SecurityEventMetadata {
  readonly securityEventId: string
  readonly userId?: string
  readonly sessionId?: string
  readonly deviceId?: string
  readonly occurredAt?: Timestamp
}

export interface SecurityEventContract {
  readonly metadata: SecurityEventMetadata
  readonly type: string
  readonly severity?: string
}
