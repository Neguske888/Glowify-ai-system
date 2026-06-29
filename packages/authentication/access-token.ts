import type { TokenMetadata } from "./token"

export interface AccessTokenContract {
  readonly metadata: TokenMetadata
  readonly scope?: readonly string[]
  readonly bearerType?: string
}
