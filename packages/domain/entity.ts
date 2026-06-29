import type { AuditMetadata, ConcurrencyTracked, DomainIdentity, SoftDeletable, TenantOwned, Versioned } from './types'

export interface Entity<TId = string, TProps extends Record<string, unknown> = Record<string, unknown>>
  extends DomainIdentity,
    TenantOwned,
    Versioned,
    ConcurrencyTracked,
    SoftDeletable {
  readonly id: TId
  readonly props: Readonly<TProps>
  readonly audit?: AuditMetadata
}
