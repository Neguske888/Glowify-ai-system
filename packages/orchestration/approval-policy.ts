import type { ApprovalMode } from "./approval"

export interface ApprovalPolicy {
  readonly mode: ApprovalMode
  readonly quorum?: number
  readonly requiredApprovers?: number
  readonly delegatedApproverIds?: readonly string[]
  readonly emergencyOverrideAllowed?: boolean
}
