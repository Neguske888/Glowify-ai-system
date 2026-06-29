export interface WebSocketMetadata {
  readonly websocketId: string
  readonly enabled?: boolean
  readonly subprotocols?: readonly string[]
}
