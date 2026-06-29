export interface SAMLMetadata {
  readonly entityId: string
  readonly acsUrl?: string
  readonly sloUrl?: string
  readonly x509CertificateId?: string
}

export interface SAMLContract {
  readonly metadata: SAMLMetadata
  readonly identityFederation?: boolean
}
