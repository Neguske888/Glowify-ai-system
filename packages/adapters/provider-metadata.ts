import type { VersionString, Timestamp } from "./types"

export interface ProviderMetadata {
  readonly providerId: string
  readonly name: string
  readonly version?: VersionString
  readonly homepage?: string
  readonly supportContact?: string
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}
