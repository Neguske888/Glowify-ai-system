export interface AIGovernancePolicy {
  readonly aiGovernanceId: string
  readonly modelRestrictions?: readonly string[]
  readonly promptLoggingAllowed?: boolean
  readonly humanReviewRequired?: boolean
  readonly safetyPolicyId?: string
}
