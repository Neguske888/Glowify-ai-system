import type { AgentMetadata } from './types'

export interface CqrsCommandRequest {
  readonly commandName: string
  readonly payload?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}

export interface CqrsQueryRequest {
  readonly queryName: string
  readonly payload?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}

export interface CqrsResult {
  readonly accepted: boolean
  readonly result?: unknown
  readonly metadata?: AgentMetadata
}

export interface CqrsAdapter {
  dispatchCommand(request: CqrsCommandRequest): Promise<CqrsResult>
  dispatchQuery(request: CqrsQueryRequest): Promise<CqrsResult>
}
