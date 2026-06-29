import type { AgentMetadata, Confidence, KnowledgeSourceId } from './types'
import type { KnowledgeSource } from './knowledge-source'

export interface KnowledgeItem {
  readonly knowledgeId: string
  readonly sourceId?: KnowledgeSourceId
  readonly title: string
  readonly summary?: string
  readonly content?: string
  readonly confidence?: Confidence
  readonly tags?: ReadonlyArray<string>
  readonly metadata?: AgentMetadata
}

export interface KnowledgeBase {
  add(source: KnowledgeSource, item: KnowledgeItem): Promise<KnowledgeItem>
  search(query: string, sourceId?: KnowledgeSourceId): Promise<ReadonlyArray<KnowledgeItem>>
  list(sourceId?: KnowledgeSourceId): Promise<ReadonlyArray<KnowledgeItem>>
}
