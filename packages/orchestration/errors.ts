export class OrchestrationContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "OrchestrationContractError"
    this.code = code
  }
}
