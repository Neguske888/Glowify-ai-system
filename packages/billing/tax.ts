import type { BillingMetadata, CurrencyCode, MonetaryAmount, TaxRuleId, TenantId, Timestamp } from './types'

export interface TaxRuleRecord extends BillingMetadata {
  readonly taxRuleId: TaxRuleId
  readonly tenantId?: TenantId
  readonly jurisdiction?: string
  readonly name: string
  readonly rate: number
  readonly inclusive?: boolean
  readonly currency?: CurrencyCode
  readonly effectiveFrom?: Timestamp
  readonly effectiveTo?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface TaxCalculation {
  readonly taxRuleId?: TaxRuleId
  readonly amount: MonetaryAmount
  readonly taxAmount: MonetaryAmount
  readonly currency: CurrencyCode
  readonly jurisdiction?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
