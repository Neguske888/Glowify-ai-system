import type { NotificationChannelName } from './types'

export interface NotificationChannel {
  readonly name: NotificationChannelName
  readonly description?: string
  readonly enabled?: boolean
  readonly metadata?: Readonly<Record<string, unknown>>
}
