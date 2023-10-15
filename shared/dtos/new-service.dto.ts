export interface TimerIntervalDto {
  start: Date
  end: Date | null
}

export interface NewServiceDto {
  name: string
  hourValue: number
  estimatedHoursTotal?: number
  addedAt: Date
  clientId: string
  timerIntervals: TimerIntervalDto[]
}
