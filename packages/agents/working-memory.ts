import type { SessionId } from './types'
import type { MemoryEntry } from './memory'
import type { MemoryStore } from './memory-store'

export interface WorkingMemory extends MemoryStore {
  readonly scope: 'working'
  snapshot(sessionId?: SessionId): Promise<ReadonlyArray<MemoryEntry>>
  clear(sessionId?: SessionId): Promise<void>
}
