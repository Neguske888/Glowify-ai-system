export interface AdapterDiagnostics {
  readonly adapterId: string
  readonly status?: string
  readonly warnings?: readonly string[]
  readonly errors?: readonly string[]
}
