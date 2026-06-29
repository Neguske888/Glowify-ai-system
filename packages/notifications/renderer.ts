import type { NotificationMessage } from './message'
import type { NotificationTemplate, TemplatePreview, TemplateValidationResult } from './template'

export interface TemplateRenderer {
  render<TPayload>(template: NotificationTemplate, message: NotificationMessage<TPayload>): Promise<NotificationMessage<TPayload>>
  preview(template: NotificationTemplate, variables?: Readonly<Record<string, unknown>>): Promise<TemplatePreview>
  validate(template: NotificationTemplate): Promise<TemplateValidationResult>
}
