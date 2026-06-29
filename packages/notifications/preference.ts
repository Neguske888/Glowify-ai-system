import type { Locale, NotificationChannelName, TenantId, OrganizationId, UserId } from './types'

export interface QuietHours {
  readonly start: string
  readonly end: string
  readonly timezone?: string
}

export interface ChannelPriority {
  readonly channel: NotificationChannelName
  readonly priority: number
}

export interface FrequencyLimit {
  readonly maxPerHour?: number
  readonly maxPerDay?: number
  readonly maxPerWeek?: number
}

export interface NotificationPreference {
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly userId?: UserId
  readonly locale?: Locale
  readonly optIn?: boolean
  readonly optOut?: boolean
  readonly quietHours?: QuietHours
  readonly frequencyLimit?: FrequencyLimit
  readonly channelPriority?: ReadonlyArray<ChannelPriority>
  readonly enabledChannels?: ReadonlyArray<NotificationChannelName>
  readonly metadata?: Readonly<Record<string, unknown>>
}
