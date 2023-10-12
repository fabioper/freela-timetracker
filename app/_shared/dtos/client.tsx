import { Timestamp } from "@firebase/firestore"

export interface Client {
  id: string
  name: string
  slug: string
  addedAt: Timestamp
}
