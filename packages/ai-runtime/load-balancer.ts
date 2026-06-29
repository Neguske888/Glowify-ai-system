export interface LoadBalancerMetadata {
  readonly loadBalancerId: string
  readonly strategy?: string
  readonly providers?: readonly string[]
}
