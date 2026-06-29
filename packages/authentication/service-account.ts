import type { TokenMetadata } from "./token"

export interface ServiceAccountContract {
  readonly metadata: TokenMetadata
  readonly serviceName?: string
  readonly issuer?: string
}
