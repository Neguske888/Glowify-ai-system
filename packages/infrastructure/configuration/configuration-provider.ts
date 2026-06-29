export interface ConfigurationProvider {
  get(key: string): string | undefined
  require(key: string): string
  has(key: string): boolean
  entries(): ReadonlyArray<[string, string]>
}

export class MapConfigurationProvider implements ConfigurationProvider {
  constructor(private readonly values: ReadonlyMap<string, string> = new Map()) {}

  get(key: string): string | undefined {
    return this.values.get(key)
  }

  require(key: string): string {
    const value = this.get(key)
    if (value === undefined) {
      throw new Error(`Missing configuration value: ${key}`)
    }
    return value
  }

  has(key: string): boolean {
    return this.values.has(key)
  }

  entries(): ReadonlyArray<[string, string]> {
    return [...this.values.entries()]
  }
}
