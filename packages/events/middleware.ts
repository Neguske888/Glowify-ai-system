import type { DeliveryResult, EventPayload } from './types'

export interface EventMiddlewareContext<T = unknown> {
  readonly event: EventPayload<T>
}

export interface EventMiddleware {
  readonly name: string
  handle<T>(context: EventMiddlewareContext<T>, next: () => Promise<DeliveryResult>): Promise<DeliveryResult>
}

export interface EventMiddlewarePipeline {
  use(middleware: EventMiddleware): void
  clear(): void
  list(): ReadonlyArray<EventMiddleware>
}
