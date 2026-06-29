import type { UsageRecord, UsageSummary } from './usage'
import type { BillingMetadata, TenantId, Timestamp, UsageMetricType } from './types'

export interface UsageMeterReading extends BillingMetadata {
  readonly tenantId?: TenantId
  readonly metric: UsageMetricType
  readonly quantity: number
  readonly measuredAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface UsageMeter {
  recordUsage(reading: UsageMeterReading): Promise<UsageRecord>
  recordUsageBatch(readings: ReadonlyArray<UsageMeterReading>): Promise<ReadonlyArray<UsageRecord>>
  summarizeUsage(tenantId?: TenantId, metric?: UsageMetricType): Promise<UsageSummary>
}
