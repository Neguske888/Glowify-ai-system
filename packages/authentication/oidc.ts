export interface OIDCMetadata {
  readonly issuer: string
  readonly clientId?: string
  readonly scopes?: readonly string[]
  readonly discoveryDocumentUrl?: string
}

export interface OIDCContract {
  readonly metadata: OIDCMetadata
  readonly nonceRequired?: boolean
}
