import type { UsageMetadata } from "./pagination"

export interface SDKResponse {
  readonly responseId: string
  readonly statusCode?: number
  readonly headers?: Readonly<Record<string, string>>
  readonly body?: unknown
  readonly usage?: UsageMetadata
}
