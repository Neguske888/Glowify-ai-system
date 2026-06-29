export interface AuthenticationMetadata {
  readonly authenticationId: string
  readonly scheme?: string
  readonly required?: boolean
  readonly tenantScoped?: boolean
}
