export type NotificationErrorCode =
  | 'NOTIFICATION_NOT_FOUND'
  | 'NOTIFICATION_INVALID_TEMPLATE'
  | 'NOTIFICATION_INVALID_RECIPIENT'
  | 'NOTIFICATION_DELIVERY_FAILED'
  | 'NOTIFICATION_PROVIDER_UNAVAILABLE'
  | 'NOTIFICATION_QUEUE_FAILED'
  | 'NOTIFICATION_SCHEDULING_FAILED'

export interface NotificationError {
  readonly code: NotificationErrorCode
  readonly message: string
  readonly details?: Readonly<Record<string, unknown>>
  readonly cause?: unknown
}
