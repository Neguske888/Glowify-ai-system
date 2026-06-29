import type { BootstrapOptions, BootstrapRuntime } from './types'

export interface StartupService {
  startup(): Promise<void>
}

export async function startup(runtime: BootstrapRuntime): Promise<void> {
  await runtime.startup()
}

export function createStartupGuard(options: BootstrapOptions): ReadonlyArray<string> {
  return Object.keys(options.context.environment ?? {})
}
