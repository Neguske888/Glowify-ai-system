import type { DeliveryResult, EventPayload } from './types'

export interface DeadLetterQueue {
  deadLetter<T>(event: EventPayload<T>, reason: string): Promise<DeliveryResult>
  inspect(): ReadonlyArray<string>
}
