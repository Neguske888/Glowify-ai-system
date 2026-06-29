export class AuthenticationContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "AuthenticationContractError"
    this.code = code
  }
}
