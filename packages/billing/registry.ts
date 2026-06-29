import type { BillingProvider } from './provider'
import type { BillingRepository } from './repository'
import type { BillingService } from './service'

export interface BillingRegistryEntry {
  readonly provider?: BillingProvider
  readonly repository?: BillingRepository
  readonly service?: BillingService
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface BillingRegistry {
  registerProvider(name: string, provider: BillingProvider): Promise<void> | void
  getProvider(name: string): BillingProvider | null
  listProviders(): ReadonlyArray<string>
  registerEntry(name: string, entry: BillingRegistryEntry): Promise<void> | void
  getEntry(name: string): BillingRegistryEntry | null
  listEntries(): ReadonlyArray<string>
}
