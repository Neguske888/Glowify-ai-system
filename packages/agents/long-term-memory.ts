import type { SessionId } from './types'
import type { MemoryEntry } from './memory'
import type { MemoryStore } from './memory-store'

export interface LongTermMemory extends MemoryStore {
  readonly scope: 'long-term'
  archive(entries: ReadonlyArray<MemoryEntry>): Promise<void>
  restore(memoryId: string, sessionId?: SessionId): Promise<MemoryEntry | null>
}
