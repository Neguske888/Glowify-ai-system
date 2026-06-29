export interface FunctionCallContract {
  readonly functionCallId: string
  readonly name: string
  readonly arguments: Readonly<Record<string, unknown>>
}
