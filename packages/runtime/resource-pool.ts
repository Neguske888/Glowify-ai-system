import type { ResourceMetadata } from "./resource"

export interface ResourcePool {
  readonly poolId: string
  readonly resources: readonly ResourceMetadata[]
}
