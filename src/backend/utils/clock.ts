export interface Clock {
  now(): Date
  nowIso(): string
  unix(): number
}
