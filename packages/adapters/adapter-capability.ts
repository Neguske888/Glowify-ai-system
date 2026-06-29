export interface AdapterCapability {
  readonly capabilityId: string
  readonly name: string
  readonly description?: string
  readonly enabled?: boolean
  readonly parameters?: Readonly<Record<string, unknown>>
}
