export interface ImageModelContract {
  readonly modelId: string
  readonly supportedSizes?: readonly string[]
  readonly supportsEditing?: boolean
}
