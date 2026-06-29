import type {
  BillingMetadata,
  CurrencyCode,
  CustomerId,
  InvoiceId,
  MonetaryAmount,
  PaymentId,
  PaymentStatus,
  PaymentMethodId,
  SubscriptionId,
  TenantId,
  Timestamp,
} from './types'

export interface PaymentRecord extends BillingMetadata {
  readonly paymentId: PaymentId
  readonly tenantId?: TenantId
  readonly customerId?: CustomerId
  readonly subscriptionId?: SubscriptionId
  readonly invoiceId?: InvoiceId
  readonly paymentMethodId?: PaymentMethodId
  readonly status: PaymentStatus
  readonly currency: CurrencyCode
  readonly amount: MonetaryAmount
  readonly authorizedAt?: Timestamp
  readonly capturedAt?: Timestamp
  readonly failedAt?: Timestamp
  readonly refundedAt?: Timestamp
  readonly providerReference?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
