import type {
  BillingAccountId,
  BillingMetadata,
  CurrencyCode,
  CustomerId,
  OrganizationId,
  PaymentMethodId,
  TenantId,
  Timestamp,
} from './types'

export type CustomerStatus = 'active' | 'inactive' | 'archived'

export interface CustomerRecord extends BillingMetadata {
  readonly billingAccountId?: BillingAccountId
  readonly customerId: CustomerId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly defaultPaymentMethodId?: PaymentMethodId
  readonly email?: string
  readonly name?: string
  readonly locale?: string
  readonly currency?: CurrencyCode
  readonly status: CustomerStatus
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}
