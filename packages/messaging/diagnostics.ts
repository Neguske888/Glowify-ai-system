export interface MessagingDiagnostics {
  readonly brokerId?: string
  readonly status?: string
  readonly warnings?: readonly string[]
  readonly errors?: readonly string[]
}
