import crypto from 'node:crypto'
import type { EncryptedSecretPayload, SecretCipher } from './types'

function deriveKeyMaterial(keyMaterial: string | Buffer): Buffer {
  if (Buffer.isBuffer(keyMaterial)) {
    return crypto.createHash('sha256').update(keyMaterial).digest()
  }

  return crypto.createHash('sha256').update(keyMaterial, 'utf8').digest()
}

export class NodeAesGcmSecretCipher implements SecretCipher {
  readonly keyId: string
  private readonly key: Buffer

  constructor(params: { keyId: string; keyMaterial: string | Buffer }) {
    this.keyId = params.keyId
    this.key = deriveKeyMaterial(params.keyMaterial)
  }

  async encrypt(plaintext: string, aad: string): Promise<EncryptedSecretPayload> {
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv)
    cipher.setAAD(Buffer.from(aad, 'utf8'))

    const ciphertext = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ])

    return {
      keyId: this.keyId,
      iv: iv.toString('base64'),
      ciphertext: ciphertext.toString('base64'),
      authTag: cipher.getAuthTag().toString('base64'),
    }
  }

  async decrypt(payload: EncryptedSecretPayload, aad: string): Promise<string> {
    if (payload.keyId !== this.keyId) {
      throw new Error('SECRET_KEY_MISMATCH')
    }

    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      this.key,
      Buffer.from(payload.iv, 'base64')
    )
    decipher.setAAD(Buffer.from(aad, 'utf8'))
    decipher.setAuthTag(Buffer.from(payload.authTag, 'base64'))

    const plaintext = Buffer.concat([
      decipher.update(Buffer.from(payload.ciphertext, 'base64')),
      decipher.final(),
    ])

    return plaintext.toString('utf8')
  }
}
