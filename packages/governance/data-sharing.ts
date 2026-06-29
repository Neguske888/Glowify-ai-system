export interface DataSharingPolicy {
  readonly dataSharingId: string
  readonly shareWith?: readonly string[]
  readonly allowInternalSharing?: boolean
  readonly allowExternalSharing?: boolean
  readonly requiresApproval?: boolean
}
