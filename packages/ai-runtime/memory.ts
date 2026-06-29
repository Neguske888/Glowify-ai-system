export interface MemoryContract {
  readonly memoryId: string
  readonly scope?: string
  readonly summary?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
