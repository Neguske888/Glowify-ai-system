import type { AgentMetadata, EvaluationOutcome, Score } from './types'

export interface EvaluationCriterion {
  readonly name: string
  readonly description?: string
  readonly target?: string
  readonly weight?: number
}

export interface EvaluationResult {
  readonly outcome: EvaluationOutcome
  readonly score?: Score
  readonly criteria?: ReadonlyArray<EvaluationCriterion>
  readonly notes?: string
  readonly metadata?: AgentMetadata
}

export interface AgentEvaluator {
  evaluate(targetId: string, criteria?: ReadonlyArray<EvaluationCriterion>): Promise<EvaluationResult>
}
