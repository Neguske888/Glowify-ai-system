export interface ExecutionResultContract {
  readonly executionId: string
  readonly success: boolean
  readonly output?: Readonly<Record<string, unknown>>
  readonly error?: string
}
