import type { BootstrapRuntime } from './types'

export interface ShutdownService {
  shutdown(): Promise<void>
}

export async function shutdown(runtime: BootstrapRuntime): Promise<void> {
  await runtime.shutdown()
}
