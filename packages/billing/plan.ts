import type {
  BillingMetadata,
  BillingPeriod,
  CurrencyCode,
  MonetaryAmount,
  PlanId,
  PricingModelId,
  PricingModelType,
  SubscriptionStatus,
  Timestamp,
} from './types'

export interface PlanFeatureLimit {
  readonly key: string
  readonly value: number | string | boolean
  readonly unit?: string
  readonly hardLimit?: boolean
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface PlanPriceTier {
  readonly upTo?: number
  readonly from?: number
  readonly unitPrice?: MonetaryAmount
  readonly flatPrice?: MonetaryAmount
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface BillingPlanRecord extends BillingMetadata {
  readonly planId: PlanId
  readonly pricingModelId?: PricingModelId
  readonly name: string
  readonly description?: string
  readonly type?: PricingModelType
  readonly currency?: CurrencyCode
  readonly billingPeriod?: BillingPeriod
  readonly status?: SubscriptionStatus
  readonly includedSeats?: number
  readonly trialDays?: number
  readonly renewalDate?: Timestamp
  readonly limits?: ReadonlyArray<PlanFeatureLimit>
  readonly tiers?: ReadonlyArray<PlanPriceTier>
  readonly metadata?: Readonly<Record<string, unknown>>
}
