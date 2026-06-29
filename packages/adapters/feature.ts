export interface FeatureContract {
  readonly featureId: string
  readonly name: string
  readonly description?: string
  readonly enabled?: boolean
}
