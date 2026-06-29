export interface PriorityContract {
  readonly priorityId: string
  readonly level: "low" | "normal" | "high" | "critical"
}
