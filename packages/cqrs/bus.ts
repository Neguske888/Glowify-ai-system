import type { Command } from './command'
import type { Query } from './query'
import type { ErrorResult, Result } from './types'

export interface CommandBus {
  execute<TPayload, TResult>(command: Command<TPayload, TResult>): Promise<Result<TResult> | ErrorResult>
}

export interface QueryBus {
  execute<TResponse, TCriteria>(query: Query<TResponse, TCriteria>): Promise<Result<TResponse> | ErrorResult>
}
