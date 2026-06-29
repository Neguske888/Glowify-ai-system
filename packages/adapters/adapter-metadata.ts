import type { ProviderId, VersionString, Timestamp } from "./types"

export interface AdapterMetadata {
  readonly adapterId: string
  readonly name: string
  readonly description?: string
  readonly providerId?: ProviderId
  readonly version?: VersionString
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}
