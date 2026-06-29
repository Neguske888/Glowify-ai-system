import type { ApprovalContract } from "./approval"

export interface HumanReviewRequest {
  readonly reviewId: string
  readonly executionId?: string
  readonly approval: ApprovalContract
  readonly prompt?: string
}

export interface HumanReviewResult {
  readonly reviewId: string
  readonly approved: boolean
  readonly comments?: string
}
