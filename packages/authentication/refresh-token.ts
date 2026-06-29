import type { TokenMetadata } from "./token"

export interface RefreshTokenContract {
  readonly metadata: TokenMetadata
  readonly rotationId?: string
  readonly rotatedFrom?: string
}
