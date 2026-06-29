import type { Timestamp } from "./types"

export interface AuthenticationAuditRecord {
  readonly auditId: string
  readonly actorId?: string
  readonly userId?: string
  readonly action: string
  readonly outcome: string
  readonly createdAt?: Timestamp
}

export interface AuthenticationAuditContract {
  readonly auditId: string
  readonly records: readonly AuthenticationAuditRecord[]
}
