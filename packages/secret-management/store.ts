import type {
  SecretKey,
  SecretMetadata,
  SecretRecord,
  SecretStorageDriver,
} from './types'

function compositeKey(key: SecretKey): string {
  return `${key.tenantId}:${key.namespace}:${key.name}`
}

export class InMemorySecretStorageDriver implements SecretStorageDriver {
  private readonly records = new Map<string, SecretRecord>()

  async put(record: SecretRecord): Promise<void> {
    this.records.set(compositeKey(record), record)
  }

  async get(key: SecretKey): Promise<SecretRecord | null> {
    return this.records.get(compositeKey(key)) || null
  }

  async list(tenantId: string, namespace?: string): Promise<SecretMetadata[]> {
    const values = Array.from(this.records.values()).filter((record) => {
      return record.tenantId === tenantId && (namespace ? record.namespace === namespace : true)
    })

    return values.map(({ payload: _payload, ...metadata }) => metadata)
  }

  async delete(key: SecretKey): Promise<void> {
    this.records.delete(compositeKey(key))
  }
}
