export interface IdGenerator {
  generate(): string
  generatePrefixed(prefix: string): string
}
