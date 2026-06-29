export interface RuntimeProfile {
  readonly profileId: string
  readonly name: string
  readonly description?: string
  readonly values?: Readonly<Record<string, unknown>>
}
