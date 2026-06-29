export interface CommandContract {
  readonly id: string
  readonly name: string
  readonly payload: Readonly<Record<string, unknown>>
  readonly metadata?: Readonly<Record<string, unknown>>
}
