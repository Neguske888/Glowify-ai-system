export interface ChecksumStrategy {
  readonly algorithm: string
  verify(input: ReadonlyArray<Uint8Array>, checksum: string): Promise<boolean>
}
