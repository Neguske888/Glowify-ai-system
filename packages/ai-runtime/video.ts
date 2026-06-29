export interface VideoModelContract {
  readonly modelId: string
  readonly supportedResolutions?: readonly string[]
  readonly supportsGeneration?: boolean
}
