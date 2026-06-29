import type { Timestamp, SessionId, UserId, DeviceId, AuthenticationLifecycleState } from "./types"

export interface SessionMetadata {
  readonly sessionId: SessionId
  readonly userId?: UserId
  readonly deviceId?: DeviceId
  readonly state?: AuthenticationLifecycleState
  readonly issuedAt?: Timestamp
  readonly expiresAt?: Timestamp
  readonly lastActiveAt?: Timestamp
}

export interface SessionContract {
  readonly metadata: SessionMetadata
  readonly ipAddress?: string
  readonly userAgent?: string
  readonly revokedAt?: Timestamp
}
