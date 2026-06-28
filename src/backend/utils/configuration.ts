export interface Configuration {
  get<T = string>(key: string): T | undefined
  require<T = string>(key: string): T
  has(key: string): boolean
}
