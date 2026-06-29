export class AdapterContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "AdapterContractError"
    this.code = code
  }
}
