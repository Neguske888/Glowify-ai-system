import type { EventType } from './types'

export interface EventRoute {
  readonly eventType: EventType
  readonly target: string
  readonly priority?: number
}

export interface EventRouter {
  resolve(eventType: EventType): ReadonlyArray<EventRoute>
  addRoute(route: EventRoute): void
  removeRoute(eventType: EventType, target: string): void
}
