import { Timestamp } from "@firebase/firestore"

export interface ClientDto {
  id: string
  name: string
  slug: string
  addedAt: Timestamp
  userId: string
}
