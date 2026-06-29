import type { Locale, Timestamp } from './types'
import type { Attachment } from './attachment'

export interface TemplateVariable {
  readonly key: string
  readonly description?: string
  readonly required?: boolean
  readonly example?: string
}

export interface TemplateLocalization {
  readonly locale: Locale
  readonly subject?: string
  readonly title?: string
  readonly body?: string
  readonly preview?: string
}

export interface TemplateVersion {
  readonly version: string
  readonly createdAt?: Timestamp
  readonly createdBy?: string
}

export interface NotificationTemplate {
  readonly templateId: string
  readonly name: string
  readonly channel: string
  readonly version: TemplateVersion
  readonly variables?: ReadonlyArray<TemplateVariable>
  readonly localizations?: ReadonlyArray<TemplateLocalization>
  readonly attachments?: ReadonlyArray<Attachment>
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface TemplatePreview {
  readonly templateId: string
  readonly locale?: Locale
  readonly subject?: string
  readonly body?: string
  readonly rendered?: boolean
}

export interface TemplateValidationResult {
  readonly valid: boolean
  readonly issues: ReadonlyArray<{ readonly path: string; readonly message: string }>
}
