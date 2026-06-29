export interface ValueObject<TProps extends Record<string, unknown> = Record<string, unknown>> {
  readonly props: Readonly<TProps>
  equals(other: ValueObject<TProps>): boolean
}
