export type SecretNamespace = string

export interface SecretKey {
  tenantId: string
  namespace: SecretNamespace
  name: string
}

export interface SecretContext {
  actor?: string
  requestId?: string
  source?: string
}

export interface EncryptedSecretPayload {
  keyId: string
  iv: string
  ciphertext: string
  authTag: string
}

export interface SecretMetadata {
  tenantId: string
  namespace: SecretNamespace
  name: string
  version: number
  keyId: string
  createdAt: string
  updatedAt: string
  revokedAt?: string
}

export interface SecretRecord extends SecretMetadata {
  payload: EncryptedSecretPayload
}

export interface SecretAuditEvent {
  action: 'store' | 'retrieve' | 'rotate' | 'revoke' | 'deny'
  success: boolean
  tenantId: string
  namespace: SecretNamespace
  name: string
  timestamp: string
  actor?: string
  requestId?: string
  details?: Record<string, unknown>
}

export interface SecretCipher {
  readonly keyId: string
  encrypt(plaintext: string, aad: string): Promise<EncryptedSecretPayload>
  decrypt(payload: EncryptedSecretPayload, aad: string): Promise<string>
}

export interface SecretStorageDriver {
  put(record: SecretRecord): Promise<void>
  get(key: SecretKey): Promise<SecretRecord | null>
  list(tenantId: string, namespace?: SecretNamespace): Promise<SecretMetadata[]>
  delete(key: SecretKey): Promise<void>
}

export interface SecretAuditSink {
  record(event: SecretAuditEvent): Promise<void> | void
}

export interface StoreSecretInput {
  key: SecretKey
  value: string
  context?: SecretContext
}

export interface GetSecretInput {
  key: SecretKey
  context?: SecretContext
}

export interface RotateSecretInput {
  key: SecretKey
  value?: string
  context?: SecretContext
  note?: string
}

export interface RevokeSecretInput {
  key: SecretKey
  context?: SecretContext
  reason?: string
}

export interface ListSecretsInput {
  tenantId: string
  namespace?: SecretNamespace
}

export interface SecretValue {
  value: string
  metadata: SecretMetadata
}
