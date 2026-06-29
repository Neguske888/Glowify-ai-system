export interface AuthenticationMetadata {
  readonly authenticationId: string
  readonly scheme?: string
  readonly tokenLocation?: string
  readonly tenantScoped?: boolean
}
