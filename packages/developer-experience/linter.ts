export interface LinterContract {
  readonly linterId: string
  readonly name: string
  readonly rules?: readonly string[]
}
