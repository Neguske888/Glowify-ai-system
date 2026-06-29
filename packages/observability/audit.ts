import type { AuditOutcome, AuditRecord, ObservabilityAttributes } from './types'

export interface AuditLogger {
  record(input: AuditRecord): void
  log(actor: string, tenant: string, action: string, resource: string, outcome: AuditOutcome, attributes?: ObservabilityAttributes): void
  entries(): ReadonlyArray<AuditRecord>
}
