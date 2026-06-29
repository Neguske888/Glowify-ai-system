export interface SignedUrlRequest {
  readonly objectId: string
  readonly expiresInSeconds: number
  readonly method?: 'GET' | 'PUT' | 'POST' | 'DELETE'
  readonly range?: { readonly start?: number; readonly end?: number }
}

export interface SignedUrlResponse {
  readonly url: string
  readonly expiresAt?: string
  readonly headers?: Readonly<Record<string, string>>
}

export interface SignedUrlService {
  create(request: SignedUrlRequest): Promise<SignedUrlResponse>
  revoke(objectId: string): Promise<boolean>
}
