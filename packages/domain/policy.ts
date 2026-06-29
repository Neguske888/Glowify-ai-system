export interface DomainPolicy<T = unknown> {
  readonly name: string
  evaluate(input: T): boolean | Promise<boolean>
}
