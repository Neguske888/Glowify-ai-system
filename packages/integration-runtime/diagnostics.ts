export interface DiagnosticsContract {
  readonly integrationId: string
  readonly status?: string
  readonly warnings?: readonly string[]
  readonly errors?: readonly string[]
}
