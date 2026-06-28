import type { RequestContext, Result, ServiceError } from '../contracts'

export interface AuthenticationMiddleware {
  authenticate(context: RequestContext): Promise<Result<RequestContext>>
}

export interface AuthorizationMiddleware {
  authorize(context: RequestContext, action: string, resource?: string): Promise<Result<boolean>>
}

export interface TenantResolutionMiddleware {
  resolve(context: RequestContext): Promise<Result<RequestContext>>
}

export interface RequestContextMiddleware {
  enrich(context: RequestContext): Promise<Result<RequestContext>>
}

export interface AuditLoggingMiddleware {
  log(context: RequestContext, event: string, details?: Record<string, unknown>): Promise<Result<boolean>>
}

export interface RateLimitingMiddleware {
  allow(context: RequestContext, key: string): Promise<Result<boolean>>
}

export interface ErrorHandlingMiddleware {
  handle(error: unknown, context: RequestContext): Promise<Result<never>>
}

export type MiddlewareError = ServiceError
