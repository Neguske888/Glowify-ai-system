import type { HealthStatus, RequestContext, Result } from '../../contracts'

export interface SendNotificationInput {
  context: RequestContext
  recipient: string
  subject?: string
  body: string
  channel: 'email' | 'sms' | 'push' | 'in-app'
}

export interface ScheduleNotificationInput extends SendNotificationInput {
  sendAt: string
}

export interface CancelNotificationInput {
  context: RequestContext
  notificationId: string
}

export interface NotificationOutput {
  notificationId: string
  status: 'queued' | 'sent' | 'delivered' | 'failed' | 'canceled'
}

export interface NotificationService {
  send(input: SendNotificationInput): Promise<Result<NotificationOutput>>
  schedule(input: ScheduleNotificationInput): Promise<Result<NotificationOutput>>
  cancel(input: CancelNotificationInput): Promise<Result<boolean>>
  healthCheck(context: RequestContext): Promise<Result<HealthStatus>>
}
