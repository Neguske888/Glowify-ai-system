import type { DeliveryResult, EventPayload } from './types'

export interface EventDispatcher {
  dispatch<T>(event: EventPayload<T>): Promise<DeliveryResult>
  acknowledge(eventId: string): Promise<DeliveryResult>
  retry(eventId: string): Promise<DeliveryResult>
  deadLetter(eventId: string, reason: string): Promise<DeliveryResult>
}
