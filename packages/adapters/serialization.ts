export interface SerializationContract {
  readonly serializationId: string
  readonly format: string
  readonly contentType?: string
  readonly schema?: Readonly<Record<string, unknown>>
}
