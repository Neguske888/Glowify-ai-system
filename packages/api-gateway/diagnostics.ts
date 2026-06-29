export interface GatewayDiagnostics {
  readonly gatewayId: string
  readonly status?: string
  readonly warnings?: readonly string[]
  readonly errors?: readonly string[]
}
