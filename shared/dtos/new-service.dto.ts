export interface NewServiceDto {
  name: string
  hourValue: number
  estimatedHoursTotal?: number
  addedAt: Date
  clientId: string
  timerIntervals: {
    start: Date
    end: Date | null
  }[]
}
