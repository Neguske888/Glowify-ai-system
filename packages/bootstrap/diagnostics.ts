import type { BootstrapDiagnosticsReport } from './types'
import type { BootstrapRegistry } from './registry'
import type { LifecycleManager } from './lifecycle'

export interface DiagnosticsService {
  diagnostics(): BootstrapDiagnosticsReport
}

export class MetadataDiagnosticsService implements DiagnosticsService {
  constructor(
    private readonly registry: BootstrapRegistry,
    private readonly lifecycle: LifecycleManager,
    private readonly environmentKeys: ReadonlyArray<string>,
  ) {}

  diagnostics(): BootstrapDiagnosticsReport {
    const metadata = this.registry.metadata()
    return {
      state: this.lifecycle.state,
      modules: this.registry.modules().map((registration) => registration.metadata),
      services: this.registry.services().map((registration) => registration.metadata),
      repositories: this.registry.repositories().map((registration) => registration.metadata),
      providers: this.registry.providers().map((registration) => registration.metadata),
      environment: [...this.environmentKeys],
    }
  }
}
