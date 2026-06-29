import type { Command } from './command'
import type { Query } from './query'
import type { ErrorResult, ExecutionContext, Result } from './types'

export interface CommandDispatcher {
  dispatch<TPayload, TResult>(command: Command<TPayload, TResult>, context: ExecutionContext): Promise<Result<TResult> | ErrorResult>
}

export interface QueryDispatcher {
  dispatch<TResponse, TCriteria>(query: Query<TResponse, TCriteria>, context: ExecutionContext): Promise<Result<TResponse> | ErrorResult>
}
