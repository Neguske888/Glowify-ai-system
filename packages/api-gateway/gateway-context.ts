import type { GatewayId, Timestamp } from "./types"

export interface GatewayMetadata {
  readonly gatewayId: GatewayId
  readonly name: string
  readonly description?: string
  readonly version?: string
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface GatewayContext {
  readonly metadata: GatewayMetadata
  readonly environment?: string
  readonly settings?: Readonly<Record<string, unknown>>
}
