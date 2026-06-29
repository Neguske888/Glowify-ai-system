export interface EvaluationMetadata {
  readonly evaluationId: string
  readonly benchmarkId?: string
  readonly score?: number
  readonly notes?: readonly string[]
}
