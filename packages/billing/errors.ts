export type BillingErrorCode =
  | 'billing-account-not-found'
  | 'customer-not-found'
  | 'subscription-not-found'
  | 'invoice-not-found'
  | 'payment-not-found'
  | 'refund-not-found'
  | 'plan-not-found'
  | 'entitlement-not-found'
  | 'pricing-model-not-found'
  | 'checkout-session-not-found'
  | 'usage-record-not-found'
  | 'coupon-not-found'
  | 'discount-not-found'
  | 'tax-rule-not-found'
  | 'credit-not-found'
  | 'trial-not-found'
  | 'provider-not-registered'
  | 'invalid-billing-state'
  | 'billing-limit-exceeded'
  | 'billing-validation-failed'
  | 'billing-provider-error'
  | 'billing-webhook-invalid'
  | 'billing-webhook-duplicate'
  | 'billing-registry-conflict'
  | 'billing-operation-not-supported'

export type BillingErrorSeverity = 'info' | 'warning' | 'error' | 'critical'

export interface BillingError {
  readonly name: 'BillingError'
  readonly code: BillingErrorCode
  readonly message: string
  readonly severity?: BillingErrorSeverity
  readonly details?: Readonly<Record<string, unknown>>
  readonly cause?: unknown
}

export interface BillingErrorResult {
  readonly ok: false
  readonly error: BillingError
}
