export interface CorsMetadata {
  readonly corsId: string
  readonly allowedOrigins?: readonly string[]
  readonly allowedMethods?: readonly string[]
  readonly allowedHeaders?: readonly string[]
}
