import type { BlueprintContract } from "./blueprint"

export interface GeneratorContract {
  readonly generatorId: string
  readonly blueprint: BlueprintContract
}
