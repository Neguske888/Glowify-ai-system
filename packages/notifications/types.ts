export type NotificationId = string
export type TenantId = string
export type OrganizationId = string
export type UserId = string
export type RecipientId = string
export type CorrelationId = string
export type Priority = 'low' | 'normal' | 'high' | 'urgent'
export type NotificationCategory = string
export type Locale = string
export type ProviderName = string
export type Timestamp = string
export type NotificationStatus =
  | 'queued'
  | 'scheduled'
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'bounced'
  | 'failed'
  | 'cancelled'

export type NotificationChannelName =
  | 'email'
  | 'sms'
  | 'push'
  | 'whatsapp'
  | 'in-app'
  | 'webhook'
  | 'slack'
  | 'discord'
  | 'microsoft-teams'
  | 'custom'

export interface NotificationMetadata {
  readonly notificationId: NotificationId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly userId?: UserId
  readonly recipientId?: RecipientId
  readonly correlationId?: CorrelationId
  readonly priority?: Priority
  readonly category?: NotificationCategory
  readonly tags?: ReadonlyArray<string>
  readonly scheduledAt?: Timestamp
  readonly expiresAt?: Timestamp
  readonly createdAt?: Timestamp
  readonly deliveredAt?: Timestamp
  readonly readAt?: Timestamp
  readonly status?: NotificationStatus
  readonly retryCount?: number
  readonly provider?: ProviderName
  readonly locale?: Locale
}

export interface NotificationContext {
  readonly metadata: NotificationMetadata
  readonly environment?: Readonly<Record<string, unknown>>
}
