export interface CLIContract {
  readonly cliId: string
  readonly name: string
  readonly version?: string
  readonly commands?: readonly string[]
}
