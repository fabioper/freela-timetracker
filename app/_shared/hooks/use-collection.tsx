import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  QueryFieldFilterConstraint,
} from "@firebase/firestore"
import { useAuth } from "@/app/_shared/contexts/auth.provider"
import { useEffect, useState } from "react"
import { query } from "firebase/firestore"
import { db } from "@/config/firebase"

export function useCollection<T>(
  collectionName: string,
  ...queryConstraints: QueryFieldFilterConstraint[]
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

  return {
    data: collectionData,
    async deleteItem(id: string) {
      await deleteDoc(doc(db, "clients", id))
    },
  }
}
