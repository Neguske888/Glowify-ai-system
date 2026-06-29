export interface CompletionModelContract {
  readonly modelId: string
  readonly maxTokens?: number
  readonly stopSequences?: readonly string[]
}
