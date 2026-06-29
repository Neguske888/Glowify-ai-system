import type { MiddlewareContract } from "./middleware"
import type { InterceptorContract } from "./interceptor"

export interface PipelineContract {
  readonly pipelineId: string
  readonly middleware: readonly MiddlewareContract[]
  readonly interceptors: readonly InterceptorContract[]
}
