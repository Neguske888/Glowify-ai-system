export class BootstrapError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'BootstrapError'
    this.code = code
  }
}

export class EnvironmentValidationError extends BootstrapError {
  constructor(message: string) {
    super('BOOTSTRAP_ENVIRONMENT_INVALID', message)
    this.name = 'EnvironmentValidationError'
  }
}

export class LifecycleTransitionError extends BootstrapError {
  constructor(message: string) {
    super('BOOTSTRAP_LIFECYCLE_INVALID', message)
    this.name = 'LifecycleTransitionError'
  }
}
