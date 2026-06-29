import type { ToolContract } from "./tool"

export interface ToolCallContract {
  readonly toolCallId: string
  readonly tool: ToolContract
  readonly arguments: Readonly<Record<string, unknown>>
}
