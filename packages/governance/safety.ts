export interface SafetyPolicy {
  readonly safetyPolicyId: string
  readonly enabled: boolean
  readonly riskThreshold?: number
  readonly escalationRequired?: boolean
}
