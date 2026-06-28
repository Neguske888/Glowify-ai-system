import type { IntegrationProvider } from './base'
import type { IntegrationResult } from './types'

export interface CreateCampaignInput {
  readonly tenantId: string
  readonly name: string
  readonly audience?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface SendCampaignInput {
  readonly tenantId: string
  readonly campaignId: string
  readonly scheduledAt?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface GetCampaignMetricsInput {
  readonly tenantId: string
  readonly campaignId: string
  readonly from?: string
  readonly to?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface MarketingProvider extends IntegrationProvider {
  createCampaign(input: CreateCampaignInput): Promise<IntegrationResult<MarketingCampaignResponse>>
  sendCampaign(input: SendCampaignInput): Promise<IntegrationResult<MarketingCampaignDeliveryResponse>>
  getCampaignMetrics(input: GetCampaignMetricsInput): Promise<IntegrationResult<MarketingCampaignMetricsResponse>>
}

export interface MarketingCampaignResponse {
  readonly campaignId: string
  readonly name: string
}

export interface MarketingCampaignDeliveryResponse {
  readonly campaignId: string
  readonly status: 'queued' | 'sent' | 'failed'
}

export interface MarketingCampaignMetricsResponse {
  readonly campaignId: string
  readonly metrics: Readonly<Record<string, number>>
}
