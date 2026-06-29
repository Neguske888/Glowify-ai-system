export interface SearchFacet {
  readonly name: string
  readonly field: string
  readonly size?: number
  readonly include?: ReadonlyArray<string>
  readonly exclude?: ReadonlyArray<string>
}
