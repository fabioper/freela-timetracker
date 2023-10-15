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
import { db } from "@/shared/config/firebase"

export async function getItemById<T>(collectionName: string, id: string) {
  const docData = await getDoc(doc(db, collectionName, id))
  return { ...docData.data(), id: docData.id } as T
}

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

  return await getItemById<T>(collectionName, documents.docs[0].id)
}

export async function updateItem<K>(
  collectionName: string,
  id: string,
  data: K,
) {
  const document = await getItemById<DocumentData>(collectionName, id)

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

export async function upsertItem<T>(
  collection: string,
  data: T,
  itemId?: string,
) {
  if (itemId) {
    return await updateItem<T>(collection, itemId, data)
  }

  return await addItem<T>(collection, data)
}

export async function deleteItem(collectionName: string, id: string) {
  await deleteDoc(doc(db, collectionName, id))
}
