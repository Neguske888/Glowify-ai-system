export interface CapabilityDescriptor {
  readonly id: string
  readonly name: string
  readonly description?: string
  readonly namespace?: string
  readonly optional?: boolean
}
