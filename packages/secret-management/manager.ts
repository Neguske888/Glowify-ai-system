import type {
  GetSecretInput,
  ListSecretsInput,
  RevokeSecretInput,
  RotateSecretInput,
  SecretAuditSink,
  SecretCipher,
  SecretContext,
  SecretKey,
  SecretMetadata,
  SecretRecord,
  SecretStorageDriver,
  SecretValue,
  StoreSecretInput,
} from './types'

function assertTenantContext(key: SecretKey): void {
  if (!key.tenantId) {
    throw new Error('TENANT_CONTEXT_REQUIRED')
  }

  if (!key.namespace) {
    throw new Error('SECRET_NAMESPACE_REQUIRED')
  }

  if (!key.name) {
    throw new Error('SECRET_NAME_REQUIRED')
  }
}

function aadFor(key: SecretKey): string {
  return `${key.tenantId}:${key.namespace}:${key.name}`
}

function nowIso(): string {
  return new Date().toISOString()
}

export class SecretManager {
  constructor(
    private readonly storage: SecretStorageDriver,
    private readonly cipher: SecretCipher,
    private readonly audit?: SecretAuditSink,
  ) {}

  private async auditEvent(
    action: 'store' | 'retrieve' | 'rotate' | 'revoke' | 'deny',
    key: SecretKey,
    success: boolean,
    context?: SecretContext,
    details?: Record<string, unknown>,
  ): Promise<void> {
    await this.audit?.record({
      action,
      success,
      tenantId: key.tenantId,
      namespace: key.namespace,
      name: key.name,
      timestamp: nowIso(),
      actor: context?.actor,
      requestId: context?.requestId,
      details,
    })
  }

  async storeSecret(input: StoreSecretInput): Promise<SecretMetadata> {
    assertTenantContext(input.key)

    const existing = await this.storage.get(input.key)
    const version = (existing?.version || 0) + 1
    const payload = await this.cipher.encrypt(input.value, aadFor(input.key))
    const timestamp = nowIso()

    const record: SecretRecord = {
      tenantId: input.key.tenantId,
      namespace: input.key.namespace,
      name: input.key.name,
      version,
      keyId: payload.keyId,
      createdAt: existing?.createdAt || timestamp,
      updatedAt: timestamp,
      revokedAt: undefined,
      payload,
    }

    await this.storage.put(record)
    await this.auditEvent('store', input.key, true, input.context, { version })

    return this.toMetadata(record)
  }

  async getSecret(input: GetSecretInput): Promise<SecretValue | null> {
    assertTenantContext(input.key)

    const record = await this.storage.get(input.key)
    if (!record || record.revokedAt) {
      await this.auditEvent('deny', input.key, false, input.context, { reason: 'missing_or_revoked' })
      return null
    }

    const value = await this.cipher.decrypt(record.payload, aadFor(input.key))
    await this.auditEvent('retrieve', input.key, true, input.context, { version: record.version })

    return {
      value,
      metadata: this.toMetadata(record),
    }
  }

  async rotateSecret(input: RotateSecretInput): Promise<SecretMetadata> {
    assertTenantContext(input.key)

    const existing = await this.storage.get(input.key)
    if (!existing) {
      throw new Error('SECRET_NOT_FOUND')
    }

    const currentValue = input.value ?? await this.cipher.decrypt(existing.payload, aadFor(input.key))
    const payload = await this.cipher.encrypt(currentValue, aadFor(input.key))
    const timestamp = nowIso()

    const rotated: SecretRecord = {
      ...existing,
      version: existing.version + 1,
      keyId: payload.keyId,
      updatedAt: timestamp,
      payload,
      revokedAt: undefined,
    }

    await this.storage.put(rotated)
    await this.auditEvent('rotate', input.key, true, input.context, { version: rotated.version, note: input.note })

    return this.toMetadata(rotated)
  }

  async revokeSecret(input: RevokeSecretInput): Promise<void> {
    assertTenantContext(input.key)

    const existing = await this.storage.get(input.key)
    if (!existing) {
      await this.auditEvent('deny', input.key, false, input.context, { reason: 'missing' })
      return
    }

    await this.storage.delete(input.key)
    await this.auditEvent('revoke', input.key, true, input.context, { reason: input.reason })
  }

  async listSecrets(input: ListSecretsInput): Promise<SecretMetadata[]> {
    if (!input.tenantId) {
      throw new Error('TENANT_CONTEXT_REQUIRED')
    }

    return this.storage.list(input.tenantId, input.namespace)
  }

  private toMetadata(record: SecretRecord): SecretMetadata {
    return {
      tenantId: record.tenantId,
      namespace: record.namespace,
      name: record.name,
      version: record.version,
      keyId: record.keyId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      revokedAt: record.revokedAt,
    }
  }
}
