export interface TransformationContract {
  readonly transformationId: string
  readonly name: string
  readonly sourceFormat?: string
  readonly targetFormat?: string
}
