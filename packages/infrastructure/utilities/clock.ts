export interface Clock {
  now(): Date
  nowEpochMs(): number
  sleep(ms: number): Promise<void>
}

export class SystemClock implements Clock {
  now(): Date {
    return new Date()
  }

  nowEpochMs(): number {
    return Date.now()
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }
}

export class FixedClock implements Clock {
  constructor(private readonly fixedTime: Date = new Date()) {}

  now(): Date {
    return new Date(this.fixedTime.getTime())
  }

  nowEpochMs(): number {
    return this.fixedTime.getTime()
  }

  sleep(): Promise<void> {
    return Promise.resolve()
  }
}
