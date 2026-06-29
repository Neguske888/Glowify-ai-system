export type StorageErrorCode =
  | 'STORAGE_OBJECT_NOT_FOUND'
  | 'STORAGE_BUCKET_NOT_FOUND'
  | 'STORAGE_UPLOAD_FAILED'
  | 'STORAGE_DOWNLOAD_FAILED'
  | 'STORAGE_DELETE_FAILED'
  | 'STORAGE_RESTORE_FAILED'
  | 'STORAGE_CHECKSUM_INVALID'
  | 'STORAGE_ACCESS_DENIED'
  | 'STORAGE_SIGNED_URL_FAILED'
  | 'STORAGE_MULTIPART_FAILED'

export interface StorageError {
  readonly code: StorageErrorCode
  readonly message: string
  readonly details?: Readonly<Record<string, unknown>>
  readonly cause?: unknown
}
