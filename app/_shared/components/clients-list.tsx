"use client"

import Link from "next/link"
import { orderBy, where } from "@firebase/firestore"
import { useAuth } from "@/app/_shared/contexts/auth.provider"
import { useCollection } from "@/app/_shared/hooks/use-collection"
import { PrimeIcons } from "primereact/api"
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog"
import { ClientDto } from "@/app/_shared/dtos/client.dto"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/app/_shared/components/card"

const dateFormatter = new Intl.DateTimeFormat("pt-br", {
  dateStyle: "short",
  timeStyle: "short",
})

export default function ClientsList() {
  const { currentUser } = useAuth()
  const router = useRouter()

  const { data: clients, deleteItem } = useCollection<ClientDto>(
    "clients",
    where("userId", "==", currentUser?.uid),
    orderBy("addedAt", "asc"),
  )

  const removeClient = useCallback(
    async (client: ClientDto) => {
      confirmDialog({
        header: "Deletar cliente",
        message: `Tem certeza que deseja excluir o cliente: ${client.name}?`,
        icon: PrimeIcons.TRASH,
        acceptLabel: "Sim, excluir",
        rejectLabel: "Não, mudei de idéia",
        acceptClassName: "p-button-danger",
        accept: async () => await deleteItem(client.id),
      })
    },
    [deleteItem],
  )

  const getMenuItems = useCallback(
    (client: ClientDto) => [
      {
        label: "Editar",
        icon: PrimeIcons.PENCIL,
        command: () => router.push(`/${client.slug}/editar`),
      },
      {
        label: "Remover",
        icon: PrimeIcons.TRASH,
        command: () => removeClient(client),
      },
    ],
    [removeClient, router],
  )

  return (
    <div className="grid grid-cols-auto gap-2">
      {clients.map((client) => (
        <Link href={`/${client.slug}`} key={client.id}>
          <Card title={client.name} menu={getMenuItems(client)}>
            <time className="text-sm">
              {dateFormatter.format(client.addedAt.toDate())}
            </time>
          </Card>
        </Link>
      ))}

      <ConfirmDialog />
    </div>
  )
}
