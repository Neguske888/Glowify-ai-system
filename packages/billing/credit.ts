import type { BillingMetadata, CurrencyCode, CreditId, CustomerId, MonetaryAmount, TenantId, Timestamp } from './types'

export type CreditStatus = 'available' | 'applied' | 'expired' | 'void'

export interface CreditRecord extends BillingMetadata {
  readonly creditId: CreditId
  readonly tenantId?: TenantId
  readonly customerId?: CustomerId
  readonly currency: CurrencyCode
  readonly amount: MonetaryAmount
  readonly remainingAmount?: MonetaryAmount
  readonly status: CreditStatus
  readonly effectiveFrom?: Timestamp
  readonly effectiveTo?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}
