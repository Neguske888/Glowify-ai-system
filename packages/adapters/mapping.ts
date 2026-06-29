import type { Timestamp } from "./types"

export interface MappingContract {
  readonly mappingId: string
  readonly source: string
  readonly target: string
  readonly createdAt?: Timestamp
}

export interface ConnectorMetadata {
  readonly connectorId: string
  readonly name: string
  readonly description?: string
  readonly sourceSystem?: string
  readonly targetSystem?: string
}
