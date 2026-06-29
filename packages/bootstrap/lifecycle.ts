import type { BootstrapLifecycleState } from './types'
import { LifecycleTransitionError } from './errors'

export interface LifecycleManager {
  readonly state: BootstrapLifecycleState
  initialize(): void
  run(): void
  stop(): void
  fail(reason?: string): void
}

export class InMemoryLifecycleManager implements LifecycleManager {
  state: BootstrapLifecycleState = 'created'

  initialize(): void {
    if (this.state !== 'created') {
      throw new LifecycleTransitionError(`Cannot initialize from state: ${this.state}`)
    }
    this.state = 'initializing'
  }

  run(): void {
    if (this.state !== 'initializing' && this.state !== 'stopped') {
      throw new LifecycleTransitionError(`Cannot transition to running from state: ${this.state}`)
    }
    this.state = 'running'
  }

  stop(): void {
    if (this.state !== 'running' && this.state !== 'failed') {
      throw new LifecycleTransitionError(`Cannot stop from state: ${this.state}`)
    }
    this.state = 'stopping'
    this.state = 'stopped'
  }

  fail(): void {
    this.state = 'failed'
  }
}
