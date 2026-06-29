import type { ApprovalPolicy } from "./approval-policy"
import type { RetryPolicy } from "./retry"
import type { TimeoutPolicy } from "./timeout"
import type { CompensationPolicy } from "./compensation"
import type { RollbackPolicy } from "./rollback"

export interface ResourceLimits {
  readonly cpu?: number
  readonly memory?: number
  readonly concurrency?: number
  readonly throughput?: number
}

export interface ExecutionPolicy {
  readonly concurrency?: number
  readonly ordering?: "sequential" | "parallel" | "priority"
  readonly isolation?: "none" | "tenant" | "workflow" | "execution"
  readonly idempotency?: boolean
  readonly cancellation?: boolean
  readonly retries?: RetryPolicy
  readonly timeout?: TimeoutPolicy
  readonly compensation?: CompensationPolicy
  readonly rollback?: RollbackPolicy
  readonly priority?: string
  readonly resourceLimits?: ResourceLimits
  readonly approval?: ApprovalPolicy
}
