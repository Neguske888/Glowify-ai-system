import type { OrchestratorContract } from "./orchestrator"

export interface OrchestrationRegistry {
  readonly orchestrators: readonly OrchestratorContract[]
}
