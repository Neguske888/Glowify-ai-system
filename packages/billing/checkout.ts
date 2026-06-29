import type {
  BillingMetadata,
  CheckoutSessionId,
  CheckoutStatus,
  CurrencyCode,
  CustomerId,
  PlanId,
  SubscriptionId,
  TenantId,
  Timestamp,
} from './types'

export interface CheckoutLineItem {
  readonly planId?: PlanId
  readonly description: string
  readonly quantity: number
  readonly unitAmount?: number
  readonly amount?: number
  readonly currency?: CurrencyCode
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface CheckoutSessionRecord extends BillingMetadata {
  readonly checkoutSessionId: CheckoutSessionId
  readonly tenantId?: TenantId
  readonly customerId?: CustomerId
  readonly subscriptionId?: SubscriptionId
  readonly status: CheckoutStatus
  readonly currency?: CurrencyCode
  readonly expiresAt?: Timestamp
  readonly completedAt?: Timestamp
  readonly cancelledAt?: Timestamp
  readonly lineItems?: ReadonlyArray<CheckoutLineItem>
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface CheckoutService {
  createCheckoutSession(input: Omit<CheckoutSessionRecord, 'checkoutSessionId' | 'status'>): Promise<CheckoutSessionRecord>
  updateCheckoutSession(checkoutSessionId: CheckoutSessionId, metadata?: Readonly<Record<string, unknown>>): Promise<CheckoutSessionRecord>
  confirmCheckoutSession(checkoutSessionId: CheckoutSessionId, metadata?: Readonly<Record<string, unknown>>): Promise<CheckoutSessionRecord>
  cancelCheckoutSession(checkoutSessionId: CheckoutSessionId, metadata?: Readonly<Record<string, unknown>>): Promise<CheckoutSessionRecord>
  getCheckoutSession(checkoutSessionId: CheckoutSessionId): Promise<CheckoutSessionRecord | null>
}
