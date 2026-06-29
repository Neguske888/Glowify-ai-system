export class MessagingContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "MessagingContractError"
    this.code = code
  }
}
