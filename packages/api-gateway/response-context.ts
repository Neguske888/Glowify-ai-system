export interface ResponseContext {
  readonly responseContextId: string
  readonly correlationId?: string
  readonly traceId?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
