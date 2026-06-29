import type { DeliveryResult, EventPayload } from './types'

export interface EventSubscriber {
  readonly subscriberId: string
  subscribe(eventType: string): Promise<DeliveryResult>
  unsubscribe(eventType?: string): Promise<DeliveryResult>
  handle<T>(event: EventPayload<T>): Promise<DeliveryResult>
}
