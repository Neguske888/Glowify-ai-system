import type {
  BillingMetadata,
  BillingPeriod,
  PlanId,
  SubscriptionId,
  SubscriptionStatus,
  TenantId,
  Timestamp,
} from './types'

export interface SubscriptionRecord extends BillingMetadata {
  readonly subscriptionId: SubscriptionId
  readonly tenantId?: TenantId
  readonly planId: PlanId
  readonly status: SubscriptionStatus
  readonly billingPeriod?: BillingPeriod
  readonly renewalDate?: Timestamp
  readonly trialEndsAt?: Timestamp
  readonly cancelledAt?: Timestamp
  readonly pausedAt?: Timestamp
  readonly resumedAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface CreateSubscriptionInput {
  readonly tenantId: TenantId
  readonly planId: PlanId
  readonly billingPeriod?: BillingPeriod
  readonly trialEndsAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface UpdateSubscriptionInput {
  readonly subscriptionId: SubscriptionId
  readonly planId?: PlanId
  readonly billingPeriod?: BillingPeriod
  readonly renewalDate?: Timestamp
  readonly trialEndsAt?: Timestamp
  readonly status?: SubscriptionStatus
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface SubscriptionLifecycleResult {
  readonly subscription: SubscriptionRecord
  readonly status: SubscriptionStatus
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface SubscriptionManager {
  createSubscription(input: CreateSubscriptionInput): Promise<SubscriptionRecord>
  updateSubscription(input: UpdateSubscriptionInput): Promise<SubscriptionRecord>
  pauseSubscription(subscriptionId: SubscriptionId, metadata?: Readonly<Record<string, unknown>>): Promise<SubscriptionLifecycleResult>
  resumeSubscription(subscriptionId: SubscriptionId, metadata?: Readonly<Record<string, unknown>>): Promise<SubscriptionLifecycleResult>
  cancelSubscription(subscriptionId: SubscriptionId, cancelledAt?: Timestamp, metadata?: Readonly<Record<string, unknown>>): Promise<SubscriptionLifecycleResult>
  syncSubscription(subscriptionId: SubscriptionId, metadata?: Readonly<Record<string, unknown>>): Promise<SubscriptionRecord>
}
