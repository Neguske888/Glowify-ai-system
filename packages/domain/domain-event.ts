import type { AuditMetadata, TenantOwned } from './types'

export interface DomainEvent<TName extends string = string, TPayload = unknown> extends TenantOwned {
  readonly eventId: string
  readonly name: TName
  readonly occurredAt: string
  readonly payload: TPayload
  readonly aggregateId?: string
  readonly aggregateType?: string
  readonly correlationId?: string
  readonly causationId?: string
  readonly version?: number
  readonly audit?: AuditMetadata
}
