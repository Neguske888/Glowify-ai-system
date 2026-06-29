import type { RuntimeContext } from "./runtime-context"

export interface KernelContext {
  readonly kernelId: string
  readonly runtime?: RuntimeContext
  readonly settings?: Readonly<Record<string, unknown>>
}
