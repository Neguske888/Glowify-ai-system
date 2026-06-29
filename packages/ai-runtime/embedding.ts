export interface EmbeddingModelContract {
  readonly modelId: string
  readonly dimensions?: number
  readonly normalized?: boolean
}
