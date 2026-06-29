import type { StreamState } from "./types"

export interface StreamMetadata {
  readonly streamId: string
  readonly state: StreamState
  readonly startedAt?: string
  readonly endedAt?: string
}
