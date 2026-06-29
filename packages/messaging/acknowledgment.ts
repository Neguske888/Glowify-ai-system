export interface AcknowledgmentContract {
  readonly acknowledgmentId: string
  readonly messageId: string
  readonly state: "ack" | "nack" | "reject"
  readonly reason?: string
}
