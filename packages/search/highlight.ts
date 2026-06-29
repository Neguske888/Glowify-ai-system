export interface SearchHighlight {
  readonly field: string
  readonly fragments: ReadonlyArray<string>
  readonly matchedTerms?: ReadonlyArray<string>
}
