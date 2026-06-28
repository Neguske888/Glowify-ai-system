import type { AIService } from '../services/ai'
import type { AnalyticsService } from '../services/analytics'
import type { AutomationService } from '../services/automation'
import type { BillingService } from '../services/billing'
import type { IntegrationService } from '../services/integrations'
import type { NotificationService } from '../services/notifications'
import type { TenantService } from '../services/tenant'
import type { UserService } from '../services/users'
import type { Clock, Configuration, Logger } from '../utils'
import type { SecretManager } from '../contracts'

export interface CommonServiceDependencies {
  logger: Logger
  config: Configuration
  clock: Clock
  secretManager: SecretManager
}

export interface AIServiceDependencies extends CommonServiceDependencies {
  analyticsService?: AnalyticsService
  integrationService?: IntegrationService
}

export interface AnalyticsServiceDependencies extends CommonServiceDependencies {}

export interface AutomationServiceDependencies extends CommonServiceDependencies {
  analyticsService?: AnalyticsService
  integrationService?: IntegrationService
  notificationService?: NotificationService
}

export interface BillingServiceDependencies extends CommonServiceDependencies {
  integrationService?: IntegrationService
  tenantService?: TenantService
}

export interface IntegrationServiceDependencies extends CommonServiceDependencies {
  tenantService?: TenantService
}

export interface NotificationServiceDependencies extends CommonServiceDependencies {
  integrationService?: IntegrationService
}

export interface TenantServiceDependencies extends CommonServiceDependencies {}

export interface UserServiceDependencies extends CommonServiceDependencies {
  tenantService?: TenantService
}

export interface AIServiceFactory {
  create(dependencies: AIServiceDependencies): AIService
}

export interface AnalyticsServiceFactory {
  create(dependencies: AnalyticsServiceDependencies): AnalyticsService
}

export interface AutomationServiceFactory {
  create(dependencies: AutomationServiceDependencies): AutomationService
}

export interface BillingServiceFactory {
  create(dependencies: BillingServiceDependencies): BillingService
}

export interface IntegrationServiceFactory {
  create(dependencies: IntegrationServiceDependencies): IntegrationService
}

export interface NotificationServiceFactory {
  create(dependencies: NotificationServiceDependencies): NotificationService
}

export interface TenantServiceFactory {
  create(dependencies: TenantServiceDependencies): TenantService
}

export interface UserServiceFactory {
  create(dependencies: UserServiceDependencies): UserService
}
