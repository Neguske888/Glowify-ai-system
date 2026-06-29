import type { ComplianceFramework } from "./types"

export interface PrivacyPolicy {
  readonly privacyId: string
  readonly frameworks?: readonly ComplianceFramework[]
  readonly purposeLimitations?: readonly string[]
  readonly dataMinimization?: boolean
  readonly subjectRights?: readonly string[]
}
