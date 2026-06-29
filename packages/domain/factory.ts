export interface Factory<TInput = unknown, TOutput = unknown> {
  create(input: TInput): TOutput | Promise<TOutput>
}
