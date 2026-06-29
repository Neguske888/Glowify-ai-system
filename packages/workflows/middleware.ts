import type { WorkflowContext, WorkflowExecutionResult } from './types'

export interface WorkflowMiddlewareContext {
  readonly context: WorkflowContext
  readonly workflowId: string
}

export interface WorkflowMiddleware {
  readonly name: string
  handle(input: WorkflowMiddlewareContext, next: () => Promise<WorkflowExecutionResult>): Promise<WorkflowExecutionResult>
}

export interface WorkflowMiddlewarePipeline {
  use(middleware: WorkflowMiddleware): void
  clear(): void
  list(): ReadonlyArray<WorkflowMiddleware>
}
