export type LifecycleState = 'created' | 'starting' | 'running' | 'stopping' | 'stopped'

export interface LifecycleManager {
  readonly state: LifecycleState
  onStart(hook: () => void | Promise<void>): this
  onStop(hook: () => void | Promise<void>): this
  start(): Promise<void>
  stop(): Promise<void>
}

export class DefaultLifecycleManager implements LifecycleManager {
  private startHooks: Array<() => void | Promise<void>> = []
  private stopHooks: Array<() => void | Promise<void>> = []

  state: LifecycleState = 'created'

  onStart(hook: () => void | Promise<void>): this {
    this.startHooks.push(hook)
    return this
  }

  onStop(hook: () => void | Promise<void>): this {
    this.stopHooks.push(hook)
    return this
  }

  async start(): Promise<void> {
    this.state = 'starting'
    for (const hook of this.startHooks) {
      await hook()
    }
    this.state = 'running'
  }

  async stop(): Promise<void> {
    this.state = 'stopping'
    for (const hook of [...this.stopHooks].reverse()) {
      await hook()
    }
    this.state = 'stopped'
  }
}
