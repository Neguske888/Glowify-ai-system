export interface RequestContext {
  requestId: string
  tenantId: string
  userId?: string
  actorId?: string
  role?: string
  locale?: string
  timezone?: string
  traceId?: string
  metadata?: Record<string, unknown>
}
