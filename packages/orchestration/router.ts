export interface RoutingRule {
  readonly name: string
  readonly match?: Readonly<Record<string, unknown>>
  readonly target?: string
}

export interface RouterContract {
  readonly rules: readonly RoutingRule[]
}
