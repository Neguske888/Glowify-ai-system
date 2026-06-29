export interface GatewayHealth {
  readonly gatewayId: string
  readonly status?: string
  readonly checkedAt?: string
  readonly notes?: readonly string[]
}
