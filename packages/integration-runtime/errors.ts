export class IntegrationRuntimeContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "IntegrationRuntimeContractError"
    this.code = code
  }
}
