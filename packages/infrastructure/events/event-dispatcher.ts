export interface EventEnvelope<T = unknown> {
  name: string
  payload: T
  timestamp: Date
}

export type EventHandler<T = unknown> = (event: EventEnvelope<T>) => void | Promise<void>

export interface EventDispatcher {
  dispatch<T>(name: string, payload: T): Promise<void>
  subscribe<T>(name: string, handler: EventHandler<T>): () => void
}

export class InMemoryEventDispatcher implements EventDispatcher {
  private readonly handlers = new Map<string, Set<EventHandler>>()

  async dispatch<T>(name: string, payload: T): Promise<void> {
    const envelope: EventEnvelope<T> = { name, payload, timestamp: new Date() }
    const handlers = [...(this.handlers.get(name) ?? [])]
    for (const handler of handlers) {
      await handler(envelope)
    }
  }

  subscribe<T>(name: string, handler: EventHandler<T>): () => void {
    const handlers = this.handlers.get(name) ?? new Set<EventHandler>()
    handlers.add(handler as EventHandler)
    this.handlers.set(name, handlers)

    return () => {
      handlers.delete(handler as EventHandler)
    }
  }
}
