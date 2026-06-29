export interface SerializerContract {
  readonly serializerId: string
  readonly format: string
  readonly contentType?: string
}
