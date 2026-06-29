import type { NotificationMetadata } from './types'
import type { NotificationTemplate } from './template'
import type { NotificationPreference } from './preference'
import type { Subscription } from './subscription'
import type { DeliveryRecord } from './delivery'
import type { Recipient } from './recipient'

export interface NotificationRepository {
  save(metadata: NotificationMetadata): Promise<void>
  findById(notificationId: string): Promise<NotificationMetadata | undefined>
  listByTenant(tenantId: string): Promise<ReadonlyArray<NotificationMetadata>>
}

export interface TemplateRepository {
  save(template: NotificationTemplate): Promise<void>
  findById(templateId: string): Promise<NotificationTemplate | undefined>
  listByChannel(channel: string): Promise<ReadonlyArray<NotificationTemplate>>
}

export interface PreferenceRepository {
  save(preference: NotificationPreference): Promise<void>
  find(tenantId?: string, organizationId?: string, userId?: string): Promise<NotificationPreference | undefined>
}

export interface SubscriptionRepository {
  save(subscription: Subscription): Promise<void>
  list(tenantId?: string, organizationId?: string, userId?: string): Promise<ReadonlyArray<Subscription>>
}

export interface RecipientRepository {
  save(recipient: Recipient): Promise<void>
  findById(recipientId: string): Promise<Recipient | undefined>
}

export interface DeliveryRepository {
  save(record: DeliveryRecord): Promise<void>
  list(notificationId: string): Promise<ReadonlyArray<DeliveryRecord>>
}
