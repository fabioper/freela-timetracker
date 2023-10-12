"use client"

import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import Link from "next/link"
import { Button } from "primereact/button"

export interface Client {
  id: string
  name: string
  slug: string
  addedAt: Date
}

export default function ClientsList({ clients }: { clients: Client[] }) {
  const dateTemplate = (client: Client) => {
    const dateFormatter = new Intl.DateTimeFormat("pt-br", {
      dateStyle: "short",
      timeStyle: "short",
    })

    return <time>{dateFormatter.format(client.addedAt)}</time>
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
