import type { UsageMetadata } from "./usage"

export interface AIResponseContract {
  readonly responseId: string
  readonly content?: string
  readonly metadata?: Readonly<Record<string, unknown>>
  readonly usage?: UsageMetadata
}
