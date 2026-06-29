export interface KernelLifecycle {
  readonly lifecycleId: string
  readonly state?: string
  readonly transitions?: readonly string[]
}
