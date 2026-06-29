export type EventErrorCode =
  | 'EVENT_BUS_REGISTRATION_FAILED'
  | 'EVENT_BUS_SERIALIZATION_FAILED'
  | 'EVENT_BUS_DELIVERY_FAILED'
  | 'EVENT_BUS_RETRY_EXHAUSTED'
  | 'EVENT_BUS_DEAD_LETTERED'

export interface EventBusError {
  readonly code: EventErrorCode
  readonly message: string
  readonly cause?: unknown
}
