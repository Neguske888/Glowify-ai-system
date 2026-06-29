export class RuntimeContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "RuntimeContractError"
    this.code = code
  }
}
