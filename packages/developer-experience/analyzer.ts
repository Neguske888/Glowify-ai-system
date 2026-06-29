export interface AnalyzerContract {
  readonly analyzerId: string
  readonly name: string
  readonly capabilities?: readonly string[]
}
