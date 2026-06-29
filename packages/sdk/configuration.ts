import type { VersionString, Timestamp } from "./types"

export interface SDKMetadata {
  readonly sdkId: string
  readonly name: string
  readonly description?: string
  readonly version?: VersionString
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface ClientMetadata {
  readonly clientId: string
  readonly name: string
  readonly description?: string
  readonly version?: VersionString
}
