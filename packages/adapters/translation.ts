export interface TranslationContract {
  readonly translationId: string
  readonly sourceFormat: string
  readonly targetFormat: string
  readonly fields?: readonly string[]
}
