import type { SDKMetadata, ClientMetadata } from "./configuration"

export interface SDKContext {
  readonly sdk: SDKMetadata
  readonly client?: ClientMetadata
  readonly environment?: string
  readonly settings?: Readonly<Record<string, unknown>>
}
