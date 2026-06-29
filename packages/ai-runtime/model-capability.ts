export interface ModelCapability {
  readonly name: string
  readonly description?: string
  readonly supported?: boolean
  readonly parameters?: Readonly<Record<string, unknown>>
}
