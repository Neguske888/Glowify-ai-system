export interface EventDescriptor {
  readonly name: string
  readonly version?: string
  readonly source?: string
  readonly correlationId?: string
}
