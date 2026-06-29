import type { AuditRecord } from "./audit-record"

export interface AuditContract {
  readonly auditId: string
  readonly records: readonly AuditRecord[]
}
