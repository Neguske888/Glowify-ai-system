export interface SecurityPolicyMetadata {
  readonly policyId: string
  readonly riskThreshold?: number
  readonly trustThreshold?: number
  readonly lockoutEnabled?: boolean
}

export interface SecurityContract {
  readonly metadata: SecurityPolicyMetadata
  readonly eventTypes?: readonly string[]
}
