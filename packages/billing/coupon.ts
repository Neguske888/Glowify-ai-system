import type { BillingMetadata, CouponId, DiscountId, TenantId, Timestamp } from './types'

export type CouponStatus = 'active' | 'inactive' | 'expired' | 'redeemed' | 'disabled'

export interface CouponRecord extends BillingMetadata {
  readonly couponId: CouponId
  readonly tenantId?: TenantId
  readonly discountId?: DiscountId
  readonly code: string
  readonly status: CouponStatus
  readonly startsAt?: Timestamp
  readonly endsAt?: Timestamp
  readonly maxRedemptions?: number
  readonly redeemedCount?: number
  readonly metadata?: Readonly<Record<string, unknown>>
}
