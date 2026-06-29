import type { Timestamp, DeviceId, UserId } from "./types"

export interface DeviceMetadata {
  readonly deviceId: DeviceId
  readonly userId?: UserId
  readonly name?: string
  readonly platform?: string
  readonly browser?: string
  readonly firstSeenAt?: Timestamp
  readonly lastSeenAt?: Timestamp
}

export interface DeviceContract {
  readonly metadata: DeviceMetadata
  readonly trusted?: boolean
  readonly compromised?: boolean
}
