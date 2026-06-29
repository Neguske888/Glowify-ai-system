export interface EventSchema<T = unknown> {
  readonly name: string
  readonly version: string
  readonly definition: T
}

export interface SchemaRegistry {
  register(schema: EventSchema): void
  resolve(name: string, version?: string): EventSchema | undefined
  list(): ReadonlyArray<EventSchema>
}
