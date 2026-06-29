export interface DeserializerContract {
  readonly deserializerId: string
  readonly format: string
  readonly contentType?: string
}
