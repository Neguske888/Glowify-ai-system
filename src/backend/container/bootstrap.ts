import { BackendContainer } from './container'
import type { InjectionToken, Registry } from './registry'
import { Registry as DefaultRegistry } from './registry'
import { TOKENS } from './tokens'
import type { Clock, Configuration, Logger } from '../utils'
import type { SecretManager } from '../contracts'
import type { AIServiceFactory, AnalyticsServiceFactory, AutomationServiceFactory, BillingServiceFactory, IntegrationServiceFactory, NotificationServiceFactory, TenantServiceFactory, UserServiceFactory } from './factories'

export interface BootstrapRegistrations {
  Logger?: Logger
  Config?: Configuration
  Clock?: Clock
  SecretManager?: SecretManager
  AIService?: ReturnType<AIServiceFactory['create']>
  BillingService?: ReturnType<BillingServiceFactory['create']>
  AutomationService?: ReturnType<AutomationServiceFactory['create']>
  AnalyticsService?: ReturnType<AnalyticsServiceFactory['create']>
  NotificationService?: ReturnType<NotificationServiceFactory['create']>
  TenantService?: ReturnType<TenantServiceFactory['create']>
  UserService?: ReturnType<UserServiceFactory['create']>
  IntegrationService?: ReturnType<IntegrationServiceFactory['create']>
}

export interface BootstrapInput {
  registrations: BootstrapRegistrations
}

const REQUIRED_TOKENS: ReadonlyArray<keyof BootstrapRegistrations> = [
  'Logger',
  'Config',
  'Clock',
  'SecretManager',
  'AIService',
  'BillingService',
  'AutomationService',
  'AnalyticsService',
  'NotificationService',
  'TenantService',
  'UserService',
  'IntegrationService',
]

const TOKEN_LOOKUP: Record<keyof BootstrapRegistrations, InjectionToken<any>> = {
  Logger: TOKENS.Logger,
  Config: TOKENS.Config,
  Clock: TOKENS.Clock,
  SecretManager: TOKENS.SecretManager,
  AIService: TOKENS.AIService,
  BillingService: TOKENS.BillingService,
  AutomationService: TOKENS.AutomationService,
  AnalyticsService: TOKENS.AnalyticsService,
  NotificationService: TOKENS.NotificationService,
  TenantService: TOKENS.TenantService,
  UserService: TOKENS.UserService,
  IntegrationService: TOKENS.IntegrationService,
}

export function bootstrapContainer(input: BootstrapInput): BackendContainer {
  const registry: Registry = new DefaultRegistry()
  const container = new BackendContainer(registry)

  for (const [name, token] of Object.entries(TOKEN_LOOKUP) as Array<[keyof BootstrapRegistrations, InjectionToken<any>]>) {
    const value = input.registrations[name]
    if (value !== undefined) {
      container.register(token, value)
    }
  }

  validateContainer(container)
  return container
}

export function validateContainer(container: BackendContainer): void {
  for (const key of REQUIRED_TOKENS) {
    const token = TOKEN_LOOKUP[key]
    if (!container.has(token)) {
      throw new Error(`MISSING_BACKEND_REGISTRATION:${String(key)}`)
    }
  }
}
