import type { ExecutionState } from "./state"

export interface TaskContract {
  readonly taskId: string
  readonly name: string
  readonly state?: ExecutionState
  readonly input?: Readonly<Record<string, unknown>>
  readonly output?: Readonly<Record<string, unknown>>
}
