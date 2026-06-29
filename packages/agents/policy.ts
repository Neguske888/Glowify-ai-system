import type { AgentMetadata, PolicyEffect, PolicyId } from './types'

export interface PolicyRule {
  readonly policyId: PolicyId
  readonly name?: string
  readonly effect: PolicyEffect
  readonly description?: string
  readonly conditions?: ReadonlyArray<Readonly<Record<string, unknown>>>
  readonly metadata?: AgentMetadata
}

export interface PolicyDecision {
  readonly allowed: boolean
  readonly effect: PolicyEffect
  readonly matchedPolicies?: ReadonlyArray<PolicyRule>
  readonly reason?: string
  readonly metadata?: AgentMetadata
}
