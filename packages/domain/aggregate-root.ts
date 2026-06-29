import type { DomainEvent } from './domain-event'
import type { Entity } from './entity'

export interface AggregateRoot<TId = string, TProps extends Record<string, unknown> = Record<string, unknown>>
  extends Entity<TId, TProps> {
  readonly domainEvents: ReadonlyArray<DomainEvent>
  addDomainEvent(event: DomainEvent): void
  clearDomainEvents(): void
}
