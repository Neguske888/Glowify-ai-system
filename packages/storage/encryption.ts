export interface EncryptionPolicy {
  readonly algorithm: string
  readonly keyId?: string
  readonly enabled?: boolean
}

export interface EncryptionManager {
  resolve(objectId: string): Promise<EncryptionPolicy | undefined>
}
