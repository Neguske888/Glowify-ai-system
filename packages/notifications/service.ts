import type { NotificationMessage } from './message'
import type { NotificationProvider } from './provider'
import type { NotificationTemplate } from './template'
import type { NotificationMetadata } from './types'
import type { NotificationPreference } from './preference'
import type { Subscription } from './subscription'
import type { DeliveryRecord } from './delivery'

export interface NotificationService {
  send<TPayload>(message: NotificationMessage<TPayload>): Promise<DeliveryRecord>
  queue<TPayload>(message: NotificationMessage<TPayload>): Promise<NotificationMessage<TPayload>>
  schedule<TPayload>(message: NotificationMessage<TPayload>, executeAt: string): Promise<NotificationMessage<TPayload>>
  render<TPayload>(template: NotificationTemplate, message: NotificationMessage<TPayload>): Promise<NotificationMessage<TPayload>>
  validate<TPayload>(message: NotificationMessage<TPayload>): Promise<{ readonly valid: boolean; readonly issues: ReadonlyArray<{ readonly path: string; readonly message: string }> }>
  track(notificationId: string): Promise<ReadonlyArray<DeliveryRecord>>
  resolvePreference(tenantId?: string, organizationId?: string, userId?: string): Promise<NotificationPreference | undefined>
  subscriptions(tenantId?: string, organizationId?: string, userId?: string): Promise<ReadonlyArray<Subscription>>
  providers(): Promise<ReadonlyArray<NotificationProvider>>
  get(notificationId: string): Promise<NotificationMetadata | undefined>
}

export interface NotificationDispatcher {
  dispatch<TPayload>(message: NotificationMessage<TPayload>): Promise<DeliveryRecord>
}

export interface PreferenceResolver {
  resolve(tenantId?: string, organizationId?: string, userId?: string): Promise<NotificationPreference | undefined>
}
