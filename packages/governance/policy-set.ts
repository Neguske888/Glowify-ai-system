import type { GovernancePolicy } from "./policy"

export interface PolicySetContract {
  readonly policySetId: string
  readonly name: string
  readonly policies: readonly GovernancePolicy[]
}
