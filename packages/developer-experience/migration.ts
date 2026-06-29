export interface MigrationContract {
  readonly migrationId: string
  readonly version?: string
  readonly description?: string
}
