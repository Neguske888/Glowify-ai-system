import type { BootstrapEnvironmentRule, BootstrapEnvironmentSnapshot } from './types'

export interface EnvironmentValidator {
  validate(rules: ReadonlyArray<BootstrapEnvironmentRule>): BootstrapEnvironmentSnapshot
}

export class GenericEnvironmentValidator implements EnvironmentValidator {
  constructor(private readonly environment: Record<string, string | undefined>) {}

  validate(rules: ReadonlyArray<BootstrapEnvironmentRule>): BootstrapEnvironmentSnapshot {
    const missing: string[] = []
    const values: Array<[string, string | undefined]> = []

    for (const rule of rules) {
      const value = this.environment[rule.key]
      values.push([rule.key, value])

      const required = rule.required ?? true
      const valid = rule.validate ? rule.validate(value) : value !== undefined && value !== ''

      if (required && !valid) {
        missing.push(rule.key)
      }
    }

    return {
      values,
      missing,
      valid: missing.length === 0,
    }
  }
}
