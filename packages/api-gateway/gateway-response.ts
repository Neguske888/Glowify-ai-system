import type { ResponseContext } from "./response-context"

export interface GatewayResponse {
  readonly responseId: string
  readonly statusCode?: number
  readonly responseContext?: ResponseContext
  readonly headers?: Readonly<Record<string, string>>
  readonly body?: unknown
}
