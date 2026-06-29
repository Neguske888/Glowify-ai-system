export interface SearchAnalyzer {
  readonly name: string
  analyze(input: string): Promise<ReadonlyArray<string>>
}
