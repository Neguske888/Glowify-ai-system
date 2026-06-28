import type { HealthStatus, RequestContext, Result, ExecutionResult } from '../../contracts'

export interface AnalyzeInput {
  context: RequestContext
  data: Record<string, unknown>
  model?: string
}

export interface GenerateInput {
  context: RequestContext
  prompt: string
  systemPrompt?: string
  model?: string
}

export interface EvaluateInput {
  context: RequestContext
  executionId: string
  outcome: Record<string, unknown>
}

export interface AIAnalysisOutput {
  insights: ReadonlyArray<Record<string, unknown>>
  metadata?: Record<string, unknown>
}

export interface AIGenerationOutput {
  text: string
  model?: string
  metadata?: Record<string, unknown>
}

export interface AIEvaluationOutput {
  executionId: string
  result: ExecutionResult<Record<string, unknown>>
}

export interface AIService {
  analyze(input: AnalyzeInput): Promise<Result<AIAnalysisOutput>>
  generate(input: GenerateInput): Promise<Result<AIGenerationOutput>>
  evaluate(input: EvaluateInput): Promise<Result<AIEvaluationOutput>>
  healthCheck(context: RequestContext): Promise<Result<HealthStatus>>
}
