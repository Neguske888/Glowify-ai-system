export interface ServiceError {
  code: string
  message: string
  retriable?: boolean
  category?: 'validation' | 'authentication' | 'authorization' | 'tenant' | 'integration' | 'system'
  details?: Record<string, unknown>
}

export interface Result<T> {
  ok: boolean
  data?: T
  error?: ServiceError
  meta?: Record<string, unknown>
}
