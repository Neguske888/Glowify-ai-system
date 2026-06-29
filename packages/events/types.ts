export type EventId = string
export type EventType = string
export type TenantId = string
export type CorrelationId = string
export type CausationId = string
export type EventSource = string
export type EventVersion = string

export type DeliveryOutcome = 'published' | 'subscribed' | 'unsubscribed' | 'dispatched' | 'acknowledged' | 'retried' | 'dead-lettered'

export interface EventMetadata {
  readonly eventId: EventId
  readonly eventType: EventType
  readonly tenantId: TenantId
  readonly correlationId?: CorrelationId
  readonly causationId?: CausationId
  readonly timestamp: string
  readonly source?: EventSource
  readonly version: EventVersion
}

export interface EventPayload<T = unknown> {
  readonly metadata: EventMetadata
  readonly payload: T
}

export interface DeliveryResult {
  readonly outcome: DeliveryOutcome
  readonly acknowledged: boolean
  readonly message?: string
}
