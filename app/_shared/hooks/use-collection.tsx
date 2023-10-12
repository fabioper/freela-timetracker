import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  updateDoc,
  where,
  WithFieldValue,
} from "@firebase/firestore"
import { useAuth } from "@/app/_shared/contexts/auth.provider"
import { useEffect, useState } from "react"
import { query } from "firebase/firestore"
import { db } from "@/app/_shared/config/firebase"

export function useCollection<T extends { id: string }>(
  collectionName: string,
  ...queryConstraints: (QueryFieldFilterConstraint | QueryOrderByConstraint)[]
) {
  const { currentUser } = useAuth()
  const [collectionData, setCollectionData] = useState<T[]>([])

  async function getItemBySlug(slug: string): Promise<T | undefined> {
    const documents = await getDocs(
      query(
        collection(db, collectionName),
        where("slug", "==", slug),
        limit(1),
      ),
    )

    if (documents.empty) {
      return
    }

    const docData = await getDoc(doc(db, collectionName, documents.docs[0].id))

    return { ...docData.data(), id: docData.id } as T
  }

  async function updateItem<K>(slug: string, data: K) {
    const document = await getItemBySlug(slug)

    if (!document) return

    await updateDoc(
      doc(db, collectionName, document.id),
      data as WithFieldValue<DocumentData>,
    )
  }

  async function addItem<T>(data: T) {
    await addDoc(
      collection(db, collectionName),
      data as WithFieldValue<DocumentData>,
    )
  }

  async function deleteItem(id: string) {
    await deleteDoc(doc(db, collectionName, id))
  }

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
    deleteItem,
    addItem,
    updateItem,
    getItemBySlug,
  }
}
