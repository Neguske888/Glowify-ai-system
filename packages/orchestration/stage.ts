import type { TaskContract } from "./task"

export interface StageContract {
  readonly stageId: string
  readonly name: string
  readonly tasks: readonly TaskContract[]
}
