import type { IntegrationProvider } from './base'
import type { IntegrationResult, WebhookVerificationResult } from './types'

export interface SendMessageInput {
  readonly tenantId: string
  readonly to: string
  readonly body: string
  readonly channel?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface SendTemplateInput {
  readonly tenantId: string
  readonly to: string
  readonly templateId: string
  readonly variables?: Readonly<Record<string, unknown>>
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface MessagingProvider extends IntegrationProvider {
  sendMessage(input: SendMessageInput): Promise<IntegrationResult<MessagingDeliveryResponse>>
  sendTemplate(input: SendTemplateInput): Promise<IntegrationResult<MessagingDeliveryResponse>>
  verifyWebhook(input: MessagingWebhookInput): Promise<IntegrationResult<WebhookVerificationResult>>
}

export interface MessagingDeliveryResponse {
  readonly messageId: string
  readonly status: 'queued' | 'sent' | 'delivered' | 'failed'
  readonly provider?: string
}

export interface MessagingWebhookInput {
  readonly tenantId: string
  readonly headers: Readonly<Record<string, string | undefined>>
  readonly body: string
  readonly signature?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
