import type { DeliveryResult, EventPayload } from './types'

export interface EventBus {
  publish<T>(event: EventPayload<T>): Promise<DeliveryResult>
  subscribe<T>(eventType: string, subscriberId: string): Promise<DeliveryResult>
  unsubscribe(subscriberId: string, eventType?: string): Promise<DeliveryResult>
}
