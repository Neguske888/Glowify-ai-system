import type { DeliveryResult, EventPayload } from './types'

export interface EventPublisher {
  publish<T>(event: EventPayload<T>): Promise<DeliveryResult>
  acknowledge(eventId: string): Promise<DeliveryResult>
}
