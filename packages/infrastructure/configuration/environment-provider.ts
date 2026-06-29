export interface EnvironmentProvider {
  get(name: string): string | undefined
  require(name: string): string
  has(name: string): boolean
  entries(): ReadonlyArray<[string, string]>
}

export class MapEnvironmentProvider implements EnvironmentProvider {
  constructor(private readonly values: ReadonlyMap<string, string> = new Map()) {}

  get(name: string): string | undefined {
    return this.values.get(name)
  }

  require(name: string): string {
    const value = this.get(name)
    if (value === undefined) {
      throw new Error(`Missing environment value: ${name}`)
    }
    return value
  }

  has(name: string): boolean {
    return this.values.has(name)
  }

  entries(): ReadonlyArray<[string, string]> {
    return [...this.values.entries()]
  }
}
