export interface RequestContext {
  readonly requestContextId: string
  readonly correlationId?: string
  readonly traceId?: string
  readonly tenantId?: string
  readonly userId?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
