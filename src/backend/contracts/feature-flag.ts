export interface FeatureFlag {
  key: string
  enabled: boolean
  tenantId?: string
  description?: string
  metadata?: Record<string, unknown>
}
