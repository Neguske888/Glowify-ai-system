export type DomainId = string
export type TenantId = string
export type EntityVersion = number
export type Timestamp = string
export type SortDirection = 'asc' | 'desc'
export type ComparisonOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains' | 'startsWith' | 'endsWith'
export type SearchMode = 'exact' | 'partial' | 'fuzzy'
export type ValidationSeverity = 'info' | 'warning' | 'error'

export interface AuditMetadata {
  readonly createdAt?: Timestamp
  readonly createdBy?: string
  readonly updatedAt?: Timestamp
  readonly updatedBy?: string
  readonly deletedAt?: Timestamp
  readonly deletedBy?: string
}

export interface TenantOwned {
  readonly tenantId: TenantId
}

export interface SoftDeletable {
  readonly deletedAt?: Timestamp
}

export interface Versioned {
  readonly version: EntityVersion
}

export interface ConcurrencyTracked {
  readonly concurrencyKey?: string
}

export interface DomainIdentity {
  readonly id: DomainId
}

export interface SearchCriteria {
  readonly query: string
  readonly mode?: SearchMode
  readonly fields?: ReadonlyArray<string>
}
