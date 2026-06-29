export class AIRuntimeContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "AIRuntimeContractError"
    this.code = code
  }
}
