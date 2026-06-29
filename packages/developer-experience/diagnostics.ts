export interface DiagnosticsContract {
  readonly diagnosticsId: string
  readonly status?: string
  readonly warnings?: readonly string[]
  readonly errors?: readonly string[]
}
