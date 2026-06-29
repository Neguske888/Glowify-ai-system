export interface ScheduledTask {
  id: string
  name: string
  runAt: Date
}

export interface SchedulerContract {
  schedule(name: string, runAt: Date): ScheduledTask
  cancel(id: string): boolean
  list(): ReadonlyArray<ScheduledTask>
}

export class InMemoryScheduler implements SchedulerContract {
  private readonly tasks: ScheduledTask[] = []
  private sequence = 0

  schedule(name: string, runAt: Date): ScheduledTask {
    const task: ScheduledTask = {
      id: `task_${++this.sequence}`,
      name,
      runAt,
    }
    this.tasks.push(task)
    return task
  }

  cancel(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id)
    if (index < 0) {
      return false
    }
    this.tasks.splice(index, 1)
    return true
  }

  list(): ReadonlyArray<ScheduledTask> {
    return [...this.tasks]
  }
}
