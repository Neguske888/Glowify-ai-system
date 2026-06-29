import type {
  BillingMetadata,
  CurrencyCode,
  CustomerId,
  InvoiceId,
  InvoiceStatus,
  MonetaryAmount,
  PaymentId,
  PlanId,
  SubscriptionId,
  TenantId,
  Timestamp,
} from './types'

export interface InvoiceLineItem {
  readonly lineItemId?: string
  readonly description: string
  readonly quantity: number
  readonly unitAmount: MonetaryAmount
  readonly amount: MonetaryAmount
  readonly currency?: CurrencyCode
  readonly taxAmount?: MonetaryAmount
  readonly discountAmount?: MonetaryAmount
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface InvoiceTotals {
  readonly subtotal: MonetaryAmount
  readonly discountTotal?: MonetaryAmount
  readonly taxTotal?: MonetaryAmount
  readonly creditTotal?: MonetaryAmount
  readonly total: MonetaryAmount
  readonly amountDue: MonetaryAmount
  readonly amountPaid?: MonetaryAmount
  readonly amountRemaining?: MonetaryAmount
  readonly currency: CurrencyCode
}

export interface InvoiceRecord extends BillingMetadata {
  readonly invoiceId: InvoiceId
  readonly tenantId?: TenantId
  readonly customerId?: CustomerId
  readonly subscriptionId?: SubscriptionId
  readonly planId?: PlanId
  readonly status: InvoiceStatus
  readonly currency: CurrencyCode
  readonly dueAt?: Timestamp
  readonly issuedAt?: Timestamp
  readonly paidAt?: Timestamp
  readonly voidedAt?: Timestamp
  readonly refundedAt?: Timestamp
  readonly paymentId?: PaymentId
  readonly lineItems: ReadonlyArray<InvoiceLineItem>
  readonly totals: InvoiceTotals
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface InvoiceService {
  createDraftInvoice(input: Omit<InvoiceRecord, 'invoiceId' | 'status' | 'issuedAt' | 'paidAt' | 'voidedAt' | 'refundedAt'>): Promise<InvoiceRecord>
  finalizeInvoice(invoiceId: InvoiceId, metadata?: Readonly<Record<string, unknown>>): Promise<InvoiceRecord>
  markInvoicePaid(invoiceId: InvoiceId, paymentId?: PaymentId, metadata?: Readonly<Record<string, unknown>>): Promise<InvoiceRecord>
  voidInvoice(invoiceId: InvoiceId, metadata?: Readonly<Record<string, unknown>>): Promise<InvoiceRecord>
  refundInvoice(invoiceId: InvoiceId, metadata?: Readonly<Record<string, unknown>>): Promise<InvoiceRecord>
  getInvoice(invoiceId: InvoiceId): Promise<InvoiceRecord | null>
  listInvoices(tenantId?: TenantId, customerId?: CustomerId, subscriptionId?: SubscriptionId): Promise<ReadonlyArray<InvoiceRecord>>
}
