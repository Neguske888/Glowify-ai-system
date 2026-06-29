export interface RollbackPolicy {
  readonly enabled: boolean
  readonly scope?: "task" | "stage" | "pipeline" | "workflow" | "execution"
  readonly preserveState?: boolean
}
