export interface OperationContract {
  readonly operationId: string
  readonly name: string
  readonly description?: string
  readonly parameters?: Readonly<Record<string, unknown>>
}
