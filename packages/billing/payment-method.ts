import type { BillingMetadata, CustomerId, PaymentMethodId, TenantId, Timestamp } from './types'

export type PaymentMethodType =
  | 'card'
  | 'bank-account'
  | 'wallet'
  | 'ach'
  | 'sepa'
  | 'upi'
  | 'paypal'
  | 'apple-pay'
  | 'google-pay'
  | 'cash'
  | 'custom'

export type PaymentMethodStatus = 'active' | 'inactive' | 'expired' | 'revoked'

export interface PaymentMethodRecord extends BillingMetadata {
  readonly paymentMethodId: PaymentMethodId
  readonly tenantId?: TenantId
  readonly customerId?: CustomerId
  readonly type: PaymentMethodType
  readonly status: PaymentMethodStatus
  readonly displayName?: string
  readonly fingerprint?: string
  readonly last4?: string
  readonly brand?: string
  readonly expMonth?: number
  readonly expYear?: number
  readonly billingCountry?: string
  readonly billingPostalCode?: string
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}
