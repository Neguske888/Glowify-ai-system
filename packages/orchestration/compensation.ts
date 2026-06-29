export interface CompensationPolicy {
  readonly enabled: boolean
  readonly scope?: "task" | "stage" | "pipeline" | "workflow" | "execution"
  readonly strategy?: "saga" | "manual" | "automatic"
}
