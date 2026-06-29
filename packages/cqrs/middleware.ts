import type { ErrorResult, ExecutionContext, Result, ValidationResult } from './types'

export interface PipelineBehavior<TRequest = unknown, TResponse = unknown> {
  handle(request: TRequest, context: ExecutionContext, next: () => Promise<Result<TResponse> | ErrorResult>): Promise<Result<TResponse> | ErrorResult>
}

export interface Middleware<TRequest = unknown, TResponse = unknown> extends PipelineBehavior<TRequest, TResponse> {
  readonly name: string
}

export interface ValidationBehavior<TRequest = unknown> extends PipelineBehavior<TRequest, ValidationResult> {}
export interface AuthorizationBehavior<TRequest = unknown, TResponse = unknown> extends PipelineBehavior<TRequest, TResponse> {}
export interface LoggingBehavior<TRequest = unknown, TResponse = unknown> extends PipelineBehavior<TRequest, TResponse> {}
export interface TransactionBehavior<TRequest = unknown, TResponse = unknown> extends PipelineBehavior<TRequest, TResponse> {}
export interface RetryBehavior<TRequest = unknown, TResponse = unknown> extends PipelineBehavior<TRequest, TResponse> {}
export interface IdempotencyBehavior<TRequest = unknown, TResponse = unknown> extends PipelineBehavior<TRequest, TResponse> {}
