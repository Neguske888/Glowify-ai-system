export interface MessageContract {
  readonly messageId: string
  readonly role: "system" | "developer" | "user" | "assistant" | "tool"
  readonly content: string
  readonly name?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
