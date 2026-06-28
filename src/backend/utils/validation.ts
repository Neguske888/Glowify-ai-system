import type { Result } from '../contracts'

export interface ValidationIssue {
  field: string
  message: string
  code?: string
}

export interface Validator<T> {
  validate(input: T): Result<T>
}

export interface SchemaValidator<T> {
  parse(input: unknown): Result<T>
  safeParse(input: unknown): Result<T>
}
