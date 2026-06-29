export interface TelemetryMetadata {
  readonly telemetryId: string
  readonly traceId?: string
  readonly spanId?: string
  readonly attributes?: Readonly<Record<string, unknown>>
}
