import { collection, onSnapshot, QueryConstraint } from "@firebase/firestore"
import { useAuth } from "@/shared/contexts/auth.provider"
import { useEffect, useState } from "react"
import { query } from "firebase/firestore"
import { db } from "@/shared/config/firebase"

export function useCollection<T extends { id: string }>(
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
) {
  const { currentUser } = useAuth()
  const [collectionData, setCollectionData] = useState<T[]>([])

  useEffect(() => {
    if (!currentUser) {
      setCollectionData([])
      return
    }

    const clientsFromUserQuery = query(
      collection(db, collectionName),
      ...queryConstraints,
    )

    const unsubscribe = onSnapshot(
      clientsFromUserQuery,
      (snapshot) => {
        setCollectionData(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as T),
        )
      },
      console.error,
    )

    return () => {
      setCollectionData([])
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, currentUser])

  return collectionData
}
