export interface AdapterBinding {
  readonly bindingId: string
  readonly adapterId: string
  readonly providerId?: string
  readonly target?: string
}
