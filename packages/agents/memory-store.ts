import type { AgentMetadata } from './types'
import type { MemoryEntry, MemoryQuery } from './memory'

export interface MemoryStore {
  store(entry: MemoryEntry): Promise<MemoryEntry>
  get(memoryId: string): Promise<MemoryEntry | null>
  query(request: MemoryQuery): Promise<ReadonlyArray<MemoryEntry>>
  delete(memoryId: string, metadata?: AgentMetadata): Promise<boolean>
}
