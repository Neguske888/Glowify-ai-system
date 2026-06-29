export class APIGatewayContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "APIGatewayContractError"
    this.code = code
  }
}
