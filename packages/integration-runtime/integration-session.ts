export interface IntegrationSession {
  readonly sessionId: string
  readonly startedAt?: string
  readonly endedAt?: string
  readonly state?: string
}
