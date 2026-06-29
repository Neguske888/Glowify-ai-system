import type {
  BillingMetadata,
  CurrencyCode,
  EntitlementId,
  PricingModelId,
  PlanId,
  SubscriptionId,
  TenantId,
  Timestamp,
  UsageMetricType,
  UsageRecordId,
} from './types'

export interface UsageRecord extends BillingMetadata {
  readonly usageRecordId: UsageRecordId
  readonly tenantId?: TenantId
  readonly subscriptionId?: SubscriptionId
  readonly planId?: PlanId
  readonly entitlementId?: EntitlementId
  readonly pricingModelId?: PricingModelId
  readonly metric: UsageMetricType
  readonly quantity: number
  readonly unit?: string
  readonly currency?: CurrencyCode
  readonly periodStart?: Timestamp
  readonly periodEnd?: Timestamp
  readonly recordedAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface UsageWindow {
  readonly tenantId?: TenantId
  readonly subscriptionId?: SubscriptionId
  readonly planId?: PlanId
  readonly metric?: UsageMetricType
  readonly periodStart?: Timestamp
  readonly periodEnd?: Timestamp
}

export interface UsageSummary {
  readonly window: UsageWindow
  readonly quantity: number
  readonly currency?: CurrencyCode
  readonly metadata?: Readonly<Record<string, unknown>>
}
