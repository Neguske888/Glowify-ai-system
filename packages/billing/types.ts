export type BillingAccountId = string
export type CustomerId = string
export type TenantId = string
export type OrganizationId = string
export type SubscriptionId = string
export type InvoiceId = string
export type PaymentId = string
export type RefundId = string
export type PlanId = string
export type EntitlementId = string
export type PricingModelId = string
export type PaymentMethodId = string
export type CheckoutSessionId = string
export type UsageRecordId = string
export type DiscountId = string
export type CouponId = string
export type TaxRuleId = string
export type CreditId = string
export type TrialId = string
export type WebhookEventId = string
export type CurrencyCode = string
export type Timestamp = string
export type Percentage = number
export type MonetaryAmount = number
export type BillingPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom'
export type SubscriptionStatus = 'free' | 'trial' | 'active' | 'paused' | 'overdue' | 'cancelled' | 'expired'
export type PricingModelType = 'flat-rate' | 'tiered' | 'volume' | 'usage-based' | 'seat-based' | 'hybrid' | 'custom'
export type UsageMetricType =
  | 'api-requests'
  | 'ai-tokens'
  | 'workflow-executions'
  | 'automation-runs'
  | 'storage-usage'
  | 'bandwidth'
  | 'seats'
  | 'custom-metrics'
export type InvoiceStatus = 'draft' | 'open' | 'paid' | 'partially-paid' | 'void' | 'refunded' | 'failed'
export type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'failed' | 'cancelled' | 'refunded'
export type EntitlementStatus = 'feature-access' | 'limits' | 'quotas' | 'overages' | 'grace-periods'
export type RefundStatus = 'pending' | 'succeeded' | 'failed' | 'cancelled'
export type TrialStatus = 'pending' | 'active' | 'ended' | 'converted' | 'cancelled'
export type CheckoutStatus = 'created' | 'pending' | 'completed' | 'expired' | 'cancelled'
export type BillingStatus =
  | SubscriptionStatus
  | InvoiceStatus
  | PaymentStatus
  | RefundStatus
  | TrialStatus
  | CheckoutStatus

export interface BillingMetadata {
  readonly billingAccountId?: BillingAccountId
  readonly customerId?: CustomerId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly subscriptionId?: SubscriptionId
  readonly invoiceId?: InvoiceId
  readonly paymentId?: PaymentId
  readonly refundId?: RefundId
  readonly planId?: PlanId
  readonly entitlementId?: EntitlementId
  readonly pricingModelId?: PricingModelId
  readonly paymentMethodId?: PaymentMethodId
  readonly checkoutSessionId?: CheckoutSessionId
  readonly usageRecordId?: UsageRecordId
  readonly discountId?: DiscountId
  readonly couponId?: CouponId
  readonly taxRuleId?: TaxRuleId
  readonly creditId?: CreditId
  readonly trialId?: TrialId
  readonly webhookEventId?: WebhookEventId
  readonly currency?: CurrencyCode
  readonly billingPeriod?: BillingPeriod
  readonly renewalDate?: Timestamp
  readonly trialEndsAt?: Timestamp
  readonly status?: BillingStatus
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
  readonly cancelledAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}
