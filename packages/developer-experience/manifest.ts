export interface ManifestContract {
  readonly manifestId: string
  readonly name: string
  readonly version?: string
  readonly entries?: readonly string[]
}
