import type { DiagnosticEvent, DiagnosticEventType, ObservabilityAttributes } from './types'

export interface DiagnosticReporter {
  report(eventType: DiagnosticEventType, message: string, attributes?: ObservabilityAttributes): void
  events(): ReadonlyArray<DiagnosticEvent>
}
