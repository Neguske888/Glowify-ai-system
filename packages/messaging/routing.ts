export interface RoutingRule {
  readonly routingRuleId: string
  readonly source?: string
  readonly target?: string
  readonly pattern?: string
}

export interface RoutingContract {
  readonly routingId: string
  readonly rules: readonly RoutingRule[]
}
