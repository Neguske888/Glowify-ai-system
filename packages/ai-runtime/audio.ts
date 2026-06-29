export interface AudioModelContract {
  readonly modelId: string
  readonly supportedFormats?: readonly string[]
  readonly supportsTranscription?: boolean
}
