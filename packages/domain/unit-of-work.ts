export interface UnitOfWork {
  begin(): Promise<void>
  commit(): Promise<void>
  rollback(): Promise<void>
  run<T>(operation: () => Promise<T>): Promise<T>
}
