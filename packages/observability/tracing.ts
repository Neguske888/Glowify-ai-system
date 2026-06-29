import type { ObservabilityAttributes, TraceEvent, TraceKind, TraceSpan } from './types'

export interface Tracer {
  trace(name: string, attributes?: ObservabilityAttributes): TraceSpan
  span(name: string, kind?: TraceKind, attributes?: ObservabilityAttributes): TraceSpan
  events(spanId: string): ReadonlyArray<TraceEvent>
}
