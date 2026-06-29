export class DeveloperExperienceContractError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "DeveloperExperienceContractError"
    this.code = code
  }
}
