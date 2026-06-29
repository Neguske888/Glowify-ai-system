export interface ToolContract {
  readonly toolId: string
  readonly name: string
  readonly description?: string
  readonly schema?: Readonly<Record<string, unknown>>
}
