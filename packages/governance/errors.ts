export class GovernanceContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "GovernanceContractError"
    this.code = code
  }
}
