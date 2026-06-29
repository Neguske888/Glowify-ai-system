export interface JobEnvelope<T = unknown> {
  id: string
  name: string
  payload: T
  enqueuedAt: Date
}

export interface JobDispatcher {
  dispatch<T>(name: string, payload: T): Promise<JobEnvelope<T>>
  queue<T>(name: string, payload: T): JobEnvelope<T>
  pending(): ReadonlyArray<JobEnvelope>
}

export class InMemoryJobDispatcher implements JobDispatcher {
  private readonly jobs: JobEnvelope[] = []
  private sequence = 0

  async dispatch<T>(name: string, payload: T): Promise<JobEnvelope<T>> {
    return this.queue(name, payload)
  }

  queue<T>(name: string, payload: T): JobEnvelope<T> {
    const job: JobEnvelope<T> = {
      id: `job_${++this.sequence}`,
      name,
      payload,
      enqueuedAt: new Date(),
    }
    this.jobs.push(job)
    return job
  }

  pending(): ReadonlyArray<JobEnvelope> {
    return [...this.jobs]
  }
}
