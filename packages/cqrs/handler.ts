import type { Command } from './command'
import type { Query } from './query'
import type { ErrorResult, HandlerContext, Result } from './types'

export interface CommandHandler<TCommand extends Command = Command, TResult = unknown> {
  handle(command: TCommand, context: HandlerContext): Promise<Result<TResult> | ErrorResult>
}

export interface QueryHandler<TQuery extends Query = Query, TResult = unknown> {
  handle(query: TQuery, context: HandlerContext): Promise<Result<TResult> | ErrorResult>
}
