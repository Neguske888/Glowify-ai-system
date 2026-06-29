import type { EventEnvelope } from './envelopes'

export interface SerializedEvent {
  readonly format?: string
  readonly body: string
}

export interface EventSerializer {
  serialize<T>(event: EventEnvelope<T>): SerializedEvent
  deserialize<T>(serialized: SerializedEvent): EventEnvelope<T>
}
