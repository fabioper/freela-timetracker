"use client"

import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import Link from "next/link"
import { Button } from "primereact/button"
import { Client } from "@/app/_shared/dtos/client"
import { where } from "@firebase/firestore"
import { useAuth } from "@/app/_shared/contexts/auth.provider"
import { useCollection } from "@/app/_shared/hooks/use-collection"

export default function ClientsList() {
  const { currentUser } = useAuth()
  const clients = useCollection<Client>(
    "clients",
    where("userId", "==", currentUser?.uid),
  )

  const dateTemplate = (client: Client) => {
    const dateFormatter = new Intl.DateTimeFormat("pt-br", {
      dateStyle: "short",
      timeStyle: "short",
    })

    return <time>{dateFormatter.format(client.addedAt.toDate())}</time>
  }

  const nameTemplate = (client: Client) => {
    return (
      <Link href={client.slug}>
        <Button link label={client.name} className="p-0" />
      </Link>
    )
  }

  return (
    <DataTable value={clients} className="p-datatable-striped">
      <Column
        field="name"
        header="Nome"
        body={nameTemplate}
        className="w-full"
      />

      <Column
        field="addedAt"
        header="Data de criação"
        body={dateTemplate}
        className="min-w-[15rem]"
      />
    </DataTable>
  )
}
