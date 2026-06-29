import type { SDKMetadata } from "./configuration"
import type { ClientContract } from "./client"
import type { EndpointContract } from "./endpoint"

export interface SDKContract {
  readonly sdkId: string
  readonly metadata: SDKMetadata
  readonly clients: readonly ClientContract[]
  readonly endpoints: readonly EndpointContract[]
}
