export interface OrchestrationDiagnostics {
  readonly orchestrationId?: string
  readonly status?: string
  readonly warnings?: readonly string[]
  readonly errors?: readonly string[]
}
