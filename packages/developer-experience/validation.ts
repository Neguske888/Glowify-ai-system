export interface ValidationRule {
  readonly ruleId: string
  readonly name: string
  readonly description?: string
}

export interface ValidationContract {
  readonly validationId: string
  readonly rules: readonly ValidationRule[]
}
