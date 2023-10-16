import { Timestamp } from "@firebase/firestore"

export interface ServiceDto {
  id: string
  name: string
  hourValue: number
  estimatedHoursTotal?: number
  addedAt: Timestamp
  clientId: string
  timerIntervals: {
    start: Timestamp
    end: Timestamp | null
  }[]
}
