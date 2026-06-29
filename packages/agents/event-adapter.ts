import type { AgentMetadata } from './types'

export interface EventAdapterRequest {
  readonly eventType: string
  readonly payload?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}

export interface EventAdapterResult {
  readonly eventType: string
  readonly accepted: boolean
  readonly metadata?: AgentMetadata
}

export interface EventAdapter {
  publish(request: EventAdapterRequest): Promise<EventAdapterResult>
}
