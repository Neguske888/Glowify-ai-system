import type { PermissionName } from './types'

export interface Permission {
  readonly name: PermissionName
  readonly action?: string
  readonly resourceType?: string
  readonly effect?: 'allow' | 'deny'
  readonly conditions?: ReadonlyArray<PermissionCondition>
  readonly inherited?: boolean
  readonly wildcard?: boolean
  readonly featureGate?: string
}

export interface PermissionCondition {
  readonly key: string
  readonly operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains' | 'startsWith' | 'endsWith' | 'exists'
  readonly value?: unknown
}

export interface PermissionSet {
  readonly permissions: ReadonlyArray<Permission>
}
