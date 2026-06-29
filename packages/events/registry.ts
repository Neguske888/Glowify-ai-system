import type { EventMetadata, EventType } from './types'

export interface EventRegistration<T = unknown> {
  readonly eventType: EventType
  readonly version: string
  readonly schema?: unknown
  readonly metadata?: Partial<EventMetadata>
  readonly description?: string
}

export interface EventRegistry {
  register<T>(registration: EventRegistration<T>): void
  unregister(eventType: EventType, version?: string): void
  has(eventType: EventType, version?: string): boolean
  list(): ReadonlyArray<EventRegistration>
}
