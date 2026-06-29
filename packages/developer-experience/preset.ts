export interface PresetContract {
  readonly presetId: string
  readonly name: string
  readonly values?: Readonly<Record<string, unknown>>
}
