import type { Timestamp, TokenId, UserId, TokenType } from "./types"

export interface TokenMetadata {
  readonly tokenId: TokenId
  readonly userId?: UserId
  readonly type: TokenType
  readonly issuedAt?: Timestamp
  readonly expiresAt?: Timestamp
  readonly revokedAt?: Timestamp
}

export interface TokenContract {
  readonly metadata: TokenMetadata
  readonly issuer?: string
  readonly audience?: string
}
