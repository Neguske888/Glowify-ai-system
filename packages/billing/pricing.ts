import type {
  BillingMetadata,
  BillingPeriod,
  CurrencyCode,
  MonetaryAmount,
  PlanId,
  PricingModelId,
  PricingModelType,
  TenantId,
  UsageMetricType,
} from './types'

export interface PricingBracket {
  readonly from?: number
  readonly to?: number
  readonly unitPrice?: MonetaryAmount
  readonly flatPrice?: MonetaryAmount
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface PricingModelRecord extends BillingMetadata {
  readonly pricingModelId: PricingModelId
  readonly planId?: PlanId
  readonly tenantId?: TenantId
  readonly type: PricingModelType
  readonly currency?: CurrencyCode
  readonly billingPeriod?: BillingPeriod
  readonly metric?: UsageMetricType
  readonly basePrice?: MonetaryAmount
  readonly seatPrice?: MonetaryAmount
  readonly brackets?: ReadonlyArray<PricingBracket>
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface PricingQuote {
  readonly pricingModelId?: PricingModelId
  readonly planId?: PlanId
  readonly tenantId?: TenantId
  readonly metric?: UsageMetricType
  readonly quantity: number
  readonly currency?: CurrencyCode
  readonly amount: MonetaryAmount
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface PricingEngine {
  quotePricing(input: PricingQuote): Promise<PricingQuote>
  previewPricing(pricingModelId: PricingModelId, quantity: number, currency?: CurrencyCode): Promise<PricingQuote>
  listPricingModels(tenantId?: TenantId, planId?: PlanId): Promise<ReadonlyArray<PricingModelRecord>>
}
