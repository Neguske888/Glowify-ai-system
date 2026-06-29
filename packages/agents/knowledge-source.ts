import type { AgentMetadata, KnowledgeSourceId, KnowledgeSourceKind } from './types'

export interface KnowledgeSource {
  readonly knowledgeSourceId: KnowledgeSourceId
  readonly kind: KnowledgeSourceKind
  readonly name: string
  readonly description?: string
  readonly uri?: string
  readonly metadata?: AgentMetadata
}
