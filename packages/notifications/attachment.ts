export interface Attachment {
  readonly attachmentId?: string
  readonly filename: string
  readonly contentType?: string
  readonly sizeBytes?: number
  readonly url?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
