export interface SearchTokenizer {
  readonly name: string
  tokenize(input: string): Promise<ReadonlyArray<string>>
}
