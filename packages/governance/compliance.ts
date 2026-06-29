import type { ComplianceFramework, Timestamp } from "./types"

export interface ComplianceStatus {
  readonly framework: ComplianceFramework
  readonly compliant: boolean
  readonly notes?: readonly string[]
}

export interface ComplianceReport {
  readonly reportId: string
  readonly tenantId?: string
  readonly organizationId?: string
  readonly frameworks: readonly ComplianceStatus[]
  readonly generatedAt?: Timestamp
  readonly version?: string
}
