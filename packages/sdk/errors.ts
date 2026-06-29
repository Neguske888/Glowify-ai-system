export class SDKContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "SDKContractError"
    this.code = code
  }
}
