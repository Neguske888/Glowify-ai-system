export interface RuntimeDiagnostics {
  readonly runtimeId: string
  readonly status?: string
  readonly warnings?: readonly string[]
  readonly errors?: readonly string[]
}
