export interface DiagnosticsMetadata {
  readonly diagnosticsId: string
  readonly status?: string
  readonly warnings?: readonly string[]
  readonly errors?: readonly string[]
}
