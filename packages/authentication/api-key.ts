import type { TokenMetadata } from "./token"

export interface ApiKeyContract {
  readonly metadata: TokenMetadata
  readonly keyName?: string
  readonly lastUsedAt?: string
}
