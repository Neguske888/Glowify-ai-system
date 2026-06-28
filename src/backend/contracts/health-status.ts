export interface HealthStatus {
  healthy: boolean
  service: string
  checkedAt: string
  details?: Record<string, unknown>
  error?: {
    code: string
    message: string
    retriable?: boolean
  }
}
