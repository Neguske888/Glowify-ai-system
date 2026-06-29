import type { PresetContract } from "./preset"

export interface BlueprintContract {
  readonly blueprintId: string
  readonly name: string
  readonly presets?: readonly PresetContract[]
}
