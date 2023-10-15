import { Timestamp } from "@firebase/firestore"
import { TimerIntervalDto } from "@/shared/dtos/new-service.dto"

export interface ServiceDto {
  id: string
  name: string
  hourValue: number
  estimatedHoursTotal?: number
  addedAt: Timestamp
  clientId: string
  timerIntervals: TimerIntervalDto[]
}
