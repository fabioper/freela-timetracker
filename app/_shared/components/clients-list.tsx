"use client"

import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import Link from "next/link"
import { Button } from "primereact/button"
import { orderBy, where } from "@firebase/firestore"
import { useAuth } from "@/app/_shared/contexts/auth.provider"
import { useCollection } from "@/app/_shared/hooks/use-collection"
import { PrimeIcons } from "primereact/api"
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog"
import { ClientDto } from "@/app/_shared/dtos/client.dto"

const dateFormatter = new Intl.DateTimeFormat("pt-br", {
  dateStyle: "short",
  timeStyle: "short",
})

export default function ClientsList() {
  const { currentUser } = useAuth()

  const { data: clients, deleteItem } = useCollection<ClientDto>(
    "clients",
    where("userId", "==", currentUser?.uid),
    orderBy("addedAt", "asc"),
  )

  const removeClient = async (client: ClientDto) => {
    confirmDialog({
      header: "Deletar cliente",
      message: `Tem certeza que deseja excluir o cliente: ${client.name}?`,
      icon: PrimeIcons.TRASH,
      acceptLabel: "Sim, excluir",
      rejectLabel: "Não, mudei de idéia",
      acceptClassName: "p-button-danger",
      accept: async () => await deleteItem(client.id),
    })
  }

  const dateTemplate = (client: ClientDto) => (
    <time>{dateFormatter.format(client.addedAt.toDate())}</time>
  )

  const nameTemplate = (client: ClientDto) => (
    <Link href={client.slug}>
      <Button link label={client.name} className="p-0" />
    </Link>
  )

  const actionsTemplate = (client: ClientDto) => (
    <div className="flex justify-end">
      <Link href={`/${client.slug}/editar`}>
        <Button
          icon={PrimeIcons.PENCIL}
          severity="info"
          size="small"
          rounded
          text
        />
      </Link>

      <Button
        icon={PrimeIcons.TRASH}
        severity="danger"
        size="small"
        rounded
        text
        onClick={() => removeClient(client)}
      />
    </div>
  )

  return (
    <>
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

        <Column body={actionsTemplate} />
      </DataTable>

      <ConfirmDialog />
    </>
  )
}
