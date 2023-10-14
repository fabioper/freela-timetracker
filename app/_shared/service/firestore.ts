import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  updateDoc,
  where,
  WithFieldValue,
} from "@firebase/firestore"
import { query } from "firebase/firestore"
import { db } from "@/app/_shared/config/firebase"

export async function getItemBySlug<T>(
  collectionName: string,
  slug: string,
): Promise<T | undefined> {
  const documents = await getDocs(
    query(collection(db, collectionName), where("slug", "==", slug), limit(1)),
  )

  if (documents.empty) {
    return
  }

  const docData = await getDoc(doc(db, collectionName, documents.docs[0].id))

  return { ...docData.data(), id: docData.id } as T
}

export async function updateItem<K>(
  collectionName: string,
  slug: string,
  data: K,
) {
  const document = await getItemBySlug<DocumentData>(collectionName, slug)

  if (!document) return

  await updateDoc(
    doc(db, collectionName, document.id),
    data as WithFieldValue<DocumentData>,
  )
}

export async function addItem<T>(collectionName: string, data: T) {
  await addDoc(
    collection(db, collectionName),
    data as WithFieldValue<DocumentData>,
  )
}

export async function deleteItem(collectionName: string, id: string) {
  await deleteDoc(doc(db, collectionName, id))
}
