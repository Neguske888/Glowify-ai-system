import type { Locale, RecipientId, TenantId, OrganizationId, UserId } from './types'

export interface Recipient {
  readonly recipientId: RecipientId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly userId?: UserId
  readonly locale?: Locale
  readonly address?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
