export interface KernelModuleContract {
  readonly moduleId: string
  readonly name: string
  readonly version?: string
  readonly enabled?: boolean
}
