export interface ToolResultContract {
  readonly toolCallId: string
  readonly success: boolean
  readonly output?: Readonly<Record<string, unknown>>
  readonly error?: string
}
