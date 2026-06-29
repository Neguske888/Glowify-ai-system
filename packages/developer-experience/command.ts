import type { ArgumentContract } from "./argument"
import type { OptionContract } from "./option"

export interface CommandContract {
  readonly commandId: string
  readonly name: string
  readonly arguments?: readonly ArgumentContract[]
  readonly options?: readonly OptionContract[]
}
