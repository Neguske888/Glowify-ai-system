export type StorageAccessEffect = 'allow' | 'deny'
export type StorageAction = 'read' | 'write' | 'delete' | 'restore' | 'list' | 'copy' | 'move' | 'rename' | 'stat' | 'signed-url' | 'transform' | 'thumbnail'

export interface ObjectLock {
  readonly enabled?: boolean
  readonly mode?: 'none' | 'governance' | 'compliance'
  readonly retainUntil?: string
  readonly legalHold?: boolean
}

export interface StorageAccessPolicy {
  readonly name: string
  readonly effect: StorageAccessEffect
  readonly principals?: ReadonlyArray<string>
  readonly actions?: ReadonlyArray<StorageAction>
  readonly buckets?: ReadonlyArray<string>
  readonly visibility?: 'public' | 'private'
  readonly conditions?: ReadonlyArray<{ readonly key: string; readonly operator: string; readonly value?: unknown }>
}
