import type { EventDispatcher, EventHandler } from './event-dispatcher'
import { InMemoryEventDispatcher } from './event-dispatcher'

export interface EventBus extends EventDispatcher {
  publish<T>(name: string, payload: T): Promise<void>
  listen<T>(name: string, handler: EventHandler<T>): () => void
}

export class InMemoryEventBus implements EventBus {
  private readonly dispatcher = new InMemoryEventDispatcher()

  dispatch<T>(name: string, payload: T): Promise<void> {
    return this.dispatcher.dispatch(name, payload)
  }

  publish<T>(name: string, payload: T): Promise<void> {
    return this.dispatch(name, payload)
  }

  subscribe<T>(name: string, handler: EventHandler<T>): () => void {
    return this.dispatcher.subscribe(name, handler)
  }

  listen<T>(name: string, handler: EventHandler<T>): () => void {
    return this.subscribe(name, handler)
  }
}
