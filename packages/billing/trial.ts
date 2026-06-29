import type { BillingMetadata, PlanId, SubscriptionId, TenantId, Timestamp, TrialId, TrialStatus } from './types'

export interface TrialRecord extends BillingMetadata {
  readonly trialId: TrialId
  readonly tenantId?: TenantId
  readonly subscriptionId?: SubscriptionId
  readonly planId?: PlanId
  readonly status: TrialStatus
  readonly startsAt?: Timestamp
  readonly endsAt?: Timestamp
  readonly convertedAt?: Timestamp
  readonly cancelledAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface TrialPolicy {
  readonly planId?: PlanId
  readonly durationDays?: number
  readonly autoConvert?: boolean
  readonly metadata?: Readonly<Record<string, unknown>>
}
