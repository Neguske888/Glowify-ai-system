export interface DeveloperEnvironment {
  readonly environmentId: string
  readonly name: string
  readonly variables?: Readonly<Record<string, string>>
}
