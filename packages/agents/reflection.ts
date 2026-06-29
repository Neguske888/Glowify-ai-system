import type { AgentMetadata, ReflectionDepth } from './types'

export interface ReflectionRequest {
  readonly subjectId: string
  readonly depth?: ReflectionDepth
  readonly context?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}

export interface ReflectionRecord {
  readonly subjectId: string
  readonly summary: string
  readonly insights?: ReadonlyArray<string>
  readonly metadata?: AgentMetadata
}

export interface AgentReflector {
  reflect(request: ReflectionRequest): Promise<ReflectionRecord>
}
