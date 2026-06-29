export interface MultipartUploadPart {
  readonly partNumber: number
  readonly etag?: string
  readonly size?: number
}

export interface MultipartUpload {
  readonly uploadId: string
  readonly objectId: string
  readonly bucketId: string
  readonly parts?: ReadonlyArray<MultipartUploadPart>
  readonly completed?: boolean
}

export interface MultipartUploadService {
  initiate(objectId: string, bucketId: string): Promise<MultipartUpload>
  complete(uploadId: string, parts: ReadonlyArray<MultipartUploadPart>): Promise<MultipartUpload>
  abort(uploadId: string): Promise<boolean>
}
