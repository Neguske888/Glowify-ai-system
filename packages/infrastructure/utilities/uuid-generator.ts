export interface UuidGenerator {
  generate(): string
}

export class SequentialUuidGenerator implements UuidGenerator {
  private sequence = 0

  generate(): string {
    this.sequence += 1
    const suffix = String(this.sequence).padStart(12, '0')
    return `00000000-0000-0000-0000-${suffix}`
  }
}
