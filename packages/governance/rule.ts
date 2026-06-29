import type { GovernancePolicy } from "./policy"

export interface GovernanceRule {
  readonly ruleId: string
  readonly name: string
  readonly description?: string
  readonly enabled?: boolean
}

export interface PolicyEvaluationResult {
  readonly policyId: string
  readonly compliant: boolean
  readonly matchedRules: readonly string[]
  readonly failedRules: readonly string[]
  readonly reasons?: readonly string[]
}

export interface RuleContract {
  readonly rule: GovernanceRule
  readonly policy: GovernancePolicy
}
