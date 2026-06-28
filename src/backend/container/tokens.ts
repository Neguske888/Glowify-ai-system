import type { AIService } from '../services/ai'
import type { AnalyticsService } from '../services/analytics'
import type { AutomationService } from '../services/automation'
import type { BillingService } from '../services/billing'
import type { IntegrationService } from '../services/integrations'
import type { NotificationService } from '../services/notifications'
import type { TenantService } from '../services/tenant'
import type { UserService } from '../services/users'
import type { Clock, Configuration, Logger } from '../utils'
import { createInjectionToken } from './registry'
import type { SecretManager } from '../contracts'

export const TOKENS = {
  AIService: createInjectionToken<AIService>('AIService'),
  BillingService: createInjectionToken<BillingService>('BillingService'),
  AutomationService: createInjectionToken<AutomationService>('AutomationService'),
  AnalyticsService: createInjectionToken<AnalyticsService>('AnalyticsService'),
  NotificationService: createInjectionToken<NotificationService>('NotificationService'),
  TenantService: createInjectionToken<TenantService>('TenantService'),
  UserService: createInjectionToken<UserService>('UserService'),
  IntegrationService: createInjectionToken<IntegrationService>('IntegrationService'),
  Logger: createInjectionToken<Logger>('Logger'),
  Config: createInjectionToken<Configuration>('Config'),
  Clock: createInjectionToken<Clock>('Clock'),
  SecretManager: createInjectionToken<SecretManager>('SecretManager'),
} as const

export type TokenOf<T> = T extends { readonly __type?: infer U } ? U : never
