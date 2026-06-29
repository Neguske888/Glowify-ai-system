export interface PlanningMetadata {
  readonly planningId: string
  readonly steps?: readonly string[]
  readonly objective?: string
  readonly priority?: string
}
