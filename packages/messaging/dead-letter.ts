export interface DeadLetterContract {
  readonly deadLetterId: string
  readonly messageId: string
  readonly reason?: string
}
