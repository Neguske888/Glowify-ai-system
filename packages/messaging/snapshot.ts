export interface SnapshotContract {
  readonly snapshotId: string
  readonly streamId?: string
  readonly createdAt?: string
  readonly state?: Readonly<Record<string, unknown>>
}
