import type { BillingMetadata, CouponId, DiscountId, MonetaryAmount, Percentage, TenantId, Timestamp } from './types'

export type DiscountType = 'percentage' | 'fixed' | 'usage-based' | 'tiered' | 'custom'

export interface DiscountRecord extends BillingMetadata {
  readonly discountId: DiscountId
  readonly tenantId?: TenantId
  readonly couponId?: CouponId
  readonly type: DiscountType
  readonly amount?: MonetaryAmount
  readonly percentage?: Percentage
  readonly validFrom?: Timestamp
  readonly validUntil?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}
