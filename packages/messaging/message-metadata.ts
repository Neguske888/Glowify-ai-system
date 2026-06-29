import type { PriorityLevel, Timestamp, VersionString } from "./types"

export interface MessageMetadata {
  readonly messageId: string
  readonly correlationId?: string
  readonly causationId?: string
  readonly source?: string
  readonly subject?: string
  readonly schemaVersion?: VersionString
  readonly priority?: PriorityLevel
  readonly createdAt?: Timestamp
}
