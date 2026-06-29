export interface ThrottlingMetadata {
  readonly throttlingId: string
  readonly enabled?: boolean
  readonly threshold?: number
  readonly windowSeconds?: number
}
