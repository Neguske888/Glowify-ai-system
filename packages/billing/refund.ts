import type {
  BillingMetadata,
  CurrencyCode,
  MonetaryAmount,
  PaymentId,
  RefundId,
  RefundStatus,
  TenantId,
  Timestamp,
} from './types'

export interface RefundRecord extends BillingMetadata {
  readonly refundId: RefundId
  readonly tenantId?: TenantId
  readonly paymentId?: PaymentId
  readonly status: RefundStatus
  readonly currency: CurrencyCode
  readonly amount: MonetaryAmount
  readonly reason?: string
  readonly refundedAt?: Timestamp
  readonly providerReference?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
