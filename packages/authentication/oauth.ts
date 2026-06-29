export interface OAuthMetadata {
  readonly provider: string
  readonly clientId?: string
  readonly scopes?: readonly string[]
  readonly redirectUri?: string
}

export interface OAuthContract {
  readonly metadata: OAuthMetadata
  readonly accountLinking?: boolean
}
