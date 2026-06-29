import type { DiagnosticEvent, DiagnosticEventType, ObservabilityAttributes, ObservabilityEvent } from './types'

export interface DiagnosticEventEnvelope extends ObservabilityEvent {
  readonly eventType: DiagnosticEventType
  readonly message: string
}

export interface EventPublisher {
  publish(event: DiagnosticEvent): void
  publishEnvelope(event: DiagnosticEventEnvelope): void
}
