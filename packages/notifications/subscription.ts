import type { NotificationChannelName, TenantId, OrganizationId, UserId } from './types'

export interface Subscription {
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly userId?: UserId
  readonly channel: NotificationChannelName
  readonly subscribed: boolean
  readonly createdAt?: string
  readonly updatedAt?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface SubscriptionService {
  subscribe(subscription: Subscription): Promise<Subscription>
  unsubscribe(subscription: Subscription): Promise<Subscription>
  list(tenantId?: TenantId, organizationId?: OrganizationId, userId?: UserId): Promise<ReadonlyArray<Subscription>>
}
