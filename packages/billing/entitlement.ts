import type {
  BillingMetadata,
  EntitlementId,
  EntitlementStatus,
  PlanId,
  SubscriptionId,
  TenantId,
  Timestamp,
} from './types'

export interface EntitlementRule {
  readonly key: string
  readonly limit?: number | string | boolean
  readonly unit?: string
  readonly hardLimit?: boolean
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface EntitlementRecord extends BillingMetadata {
  readonly entitlementId: EntitlementId
  readonly tenantId?: TenantId
  readonly subscriptionId?: SubscriptionId
  readonly planId?: PlanId
  readonly status: EntitlementStatus
  readonly rules: ReadonlyArray<EntitlementRule>
  readonly effectiveFrom?: Timestamp
  readonly effectiveTo?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface EntitlementDecision {
  readonly allowed: boolean
  readonly reason?: string
  readonly entitlement?: EntitlementRecord
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface EntitlementResolver {
  resolveEntitlements(tenantId?: TenantId, subscriptionId?: SubscriptionId, planId?: PlanId): Promise<ReadonlyArray<EntitlementRecord>>
  evaluateEntitlement(input: EntitlementRule, tenantId?: TenantId, subscriptionId?: SubscriptionId, planId?: PlanId): Promise<EntitlementDecision>
}
