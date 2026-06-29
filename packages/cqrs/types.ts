export type RequestId = string
export type CorrelationId = string
export type CausationId = string
export type TenantId = string
export type ActorId = string
export type Version = string
export type Timestamp = string
export type RequestSource = string

export interface RequestMetadata {
  readonly requestId: RequestId
  readonly correlationId?: CorrelationId
  readonly causationId?: CausationId
  readonly tenantId?: TenantId
  readonly actorId?: ActorId
  readonly timestamp: Timestamp
  readonly source?: RequestSource
  readonly version?: Version
}

export interface CorrelationContext {
  readonly correlationId?: CorrelationId
  readonly causationId?: CausationId
}

export interface RequestContext<TMetadata extends RequestMetadata = RequestMetadata> {
  readonly metadata: TMetadata
  readonly cancellationToken?: CancellationToken
  readonly timeoutMs?: number
  readonly mode?: ExecutionMode
}

export interface HandlerContext<TMetadata extends RequestMetadata = RequestMetadata> {
  readonly metadata: TMetadata
  readonly requestContext: RequestContext<TMetadata>
}

export interface ExecutionContext<TMetadata extends RequestMetadata = RequestMetadata> extends HandlerContext<TMetadata> {
  readonly synchronous: boolean
  readonly asynchronous: boolean
  readonly startedAt?: Timestamp
  readonly completedAt?: Timestamp
}

export type ExecutionMode = 'synchronous' | 'asynchronous'

export interface CancellationToken {
  readonly cancelled: boolean
  readonly reason?: string
  throwIfCancelled(): void
}

export interface ValidationIssue {
  readonly path: string
  readonly message: string
  readonly code?: string
}

export interface ValidationResult {
  readonly valid: boolean
  readonly issues: ReadonlyArray<ValidationIssue>
}

export interface Result<T = unknown> {
  readonly success: boolean
  readonly data?: T
  readonly metadata?: RequestMetadata
}

export interface ErrorResult {
  readonly success: false
  readonly errorCode: string
  readonly message: string
  readonly metadata?: RequestMetadata
  readonly details?: Readonly<Record<string, unknown>>
}
