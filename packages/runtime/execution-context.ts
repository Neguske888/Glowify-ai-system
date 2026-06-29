import type { ExecutionMetadata } from "./execution"

export interface RuntimeExecutionContext {
  readonly metadata: ExecutionMetadata
  readonly trace?: Readonly<Record<string, unknown>>
  readonly variables?: Readonly<Record<string, unknown>>
}
