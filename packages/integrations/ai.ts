import type { IntegrationProvider } from './base'
import type { IntegrationContext, IntegrationResult } from './types'

export interface GenerateTextInput {
  readonly tenantId: string
  readonly prompt: string
  readonly systemPrompt?: string
  readonly model?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface GenerateEmbeddingInput {
  readonly tenantId: string
  readonly input: string | ReadonlyArray<string>
  readonly model?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface ModerateInput {
  readonly tenantId: string
  readonly input: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface AIProvider extends IntegrationProvider {
  generateText(input: GenerateTextInput): Promise<IntegrationResult<AITextResponse>>
  generateEmbedding(input: GenerateEmbeddingInput): Promise<IntegrationResult<AIRawEmbeddingResponse>>
  moderate(input: ModerateInput): Promise<IntegrationResult<AIModerationResponse>>
}

export interface AITextResponse {
  readonly text: string
  readonly model?: string
  readonly usage?: Readonly<Record<string, number>>
}

export interface AIRawEmbeddingResponse {
  readonly embedding: ReadonlyArray<number>
  readonly dimensions: number
  readonly model?: string
}

export interface AIModerationResponse {
  readonly flagged: boolean
  readonly categories: ReadonlyArray<string>
  readonly scores?: Readonly<Record<string, number>>
}

export type { IntegrationContext }
